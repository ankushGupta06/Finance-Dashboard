import { useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import TransactionList from "../components/transactions/TransactionList";
import { useRole } from "../context/RoleContext";
import { transactions as initialTransactions } from "../data/transactions";
import { categories } from "../data/categories";
import { useAlert } from "../context/AlertContext";
import {
  Search,
  Plus,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TransactionRecord = (typeof initialTransactions)[number];
type TransactionType = TransactionRecord["type"];

const getEmptyFormState = (): {
  note: string;
  amount: string;
  type: TransactionType;
  categoryId: string;
  date: string;
} => ({
  note: "",
  amount: "",
  type: "expense",
  categoryId: "",
  date: new Date().toISOString().split("T")[0],
});

export default function TransactionsPage() {
  const { role } = useRole();
  const { addAlert } = useAlert();

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [localTransactions, setLocalTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionRecord | null>(null);
  const [formState, setFormState] = useState(getEmptyFormState);

  const filteredFormCategories = useMemo(
    () => categories.filter((category) => category.type === formState.type),
    [formState.type],
  );

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = localTransactions.filter((t) => {
      const categoryName =
        categories.find((c) => c.id === t.categoryId)?.name.toLowerCase() || "";

      const matchesSearch =
        normalizedSearch.length === 0 ||
        t.note.toLowerCase().includes(normalizedSearch) ||
        t.type.toLowerCase().includes(normalizedSearch) ||
        t.date.toLowerCase().includes(normalizedSearch) ||
        String(t.amount).includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" || t.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.slice().sort((a, b) => {
      switch (selectedSort) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-high":
          return b.amount - a.amount;
        case "amount-low":
          return a.amount - b.amount;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [localTransactions, searchTerm, selectedCategory, selectedSort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetForm = () => {
    setFormState(getEmptyFormState());
    setEditingTransaction(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: TransactionRecord) => {
    setEditingTransaction(transaction);
    setFormState({
      note: transaction.note,
      amount: String(transaction.amount),
      type: transaction.type,
      categoryId: transaction.categoryId,
      date: transaction.date,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleFormChange = (
    field: keyof typeof formState,
    value: string,
  ) => {
    setFormState((prev) => {
      const nextState = {
        ...prev,
        [field]: value,
      };

      if (field === "type") {
        const nextType = value as TransactionType;
        const nextCategories = categories.filter(
          (category) => category.type === nextType,
        );
        const hasMatchingCategory = nextCategories.some(
          (category) => category.id === prev.categoryId,
        );

        nextState.categoryId = hasMatchingCategory
          ? prev.categoryId
          : nextCategories[0]?.id || "";
      }

      return nextState;
    });
  };

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const amount = Number(formState.amount);
      const note = formState.note.trim();
      const categoryId = formState.categoryId;
      const type = formState.type;
      const date = formState.date;

      if (!note) {
        addAlert("Note is required.", "error");
        return;
      }

      if (!amount || amount <= 0) {
        addAlert("Amount must be greater than 0.", "error");
        return;
      }

      if (!categoryId) {
        addAlert("Please select a category.", "error");
        return;
      }

      if (!date) {
        addAlert("Please select a transaction date.", "error");
        return;
      }

      const matchedCategory = categories.find((category) => category.id === categoryId);

      if (!matchedCategory || matchedCategory.type !== type) {
        addAlert("Please choose a category that matches the transaction type.", "error");
        return;
      }

      const baseTransaction = {
        amount,
        type,
        categoryId,
        accountId: "a1",
        mode: "cash",
        date,
        note,
      };

      if (editingTransaction) {
        setLocalTransactions((prev) =>
          prev.map((transaction) =>
            transaction.id === editingTransaction.id
              ? {
                  ...transaction,
                  ...baseTransaction,
                }
              : transaction,
          ),
        );
        addAlert("Transaction updated successfully.", "success");
      } else {
        const newTx = {
          id: `t-${Date.now()}`,
          ...baseTransaction,
          createdAt: new Date().toISOString(),
        };

        setLocalTransactions((prev) => [newTx, ...prev]);
        addAlert("Transaction added successfully.", "success");
      }

      setCurrentPage(1);
      closeModal();
    } catch (error) {
      console.error(error);
      addAlert("Something went wrong while saving the transaction.", "error");
    }
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setLocalTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId),
    );

    setCurrentPage(1);
    addAlert("Transaction deleted successfully.", "success");
  };

  const exportToCSV = () => {
    try {
      if (!localTransactions.length) {
        addAlert("No transactions to export.", "error");
        return;
      }

      const headers = ["ID,Date,Note,Category,Amount,Type\n"];

      const rows = localTransactions.map((t) => {
        const categoryName =
          categories.find((c) => c.id === t.categoryId)?.name || "Other";

        return `${t.id},${t.date},"${t.note}",${categoryName},${t.amount},${t.type}`;
      });

      const blob = new Blob([headers + rows.join("\n")], {
        type: "text/csv",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions_${new Date().toLocaleDateString()}.csv`;
      a.click();

      window.URL.revokeObjectURL(url);

      addAlert("CSV exported successfully.", "success");
    } catch (error) {
      console.error(error);
      addAlert("Failed to export CSV.", "error");
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: string) => {
    setSelectedSort(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex bg-surface min-h-screen transition-colors">
      <Sidebar />
      <Container>
        <Header />

        <div className="px-4 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                Transactions
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Review and manage your financial logs
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
              >
                <Download size={16} />
                Export CSV
              </button>

              {role === "admin" && (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all"
              >
                <Plus size={16} />
                Add Transaction
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-[28px] border border-gray-50 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by note, category, type, date or amount..."
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <select
              className="bg-gray-50 border-none rounded-2xl py-3 px-6 text-xs font-bold text-gray-600 outline-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="bg-gray-50 border-none rounded-2xl py-3 px-6 text-xs font-bold text-gray-600 outline-none cursor-pointer"
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm">
            <TransactionList
              transactions={paginatedTransactions}
              categories={categories}
              role={role}
              onEdit={openEditModal}
              onDelete={handleDeleteTransaction}
            />

            {filteredTransactions.length > ITEMS_PER_PAGE && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-50 gap-4">
                <p className="text-xs font-bold text-gray-400">
                  Showing <span className="text-gray-800">{startIndex + 1}-{startIndex + paginatedTransactions.length}</span> of {filteredTransactions.length} transactions
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className="p-2 rounded-xl border border-gray-100 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          safeCurrentPage === i + 1
                            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className="p-2 rounded-xl border border-gray-100 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-md p-10 relative shadow-2xl animate-in fade-in zoom-in duration-200">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-black text-gray-800 mb-6">
                {editingTransaction ? "Edit Transaction" : "New Transaction"}
              </h3>

              <form onSubmit={handleAddTransaction} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                    Note
                  </label>
                  <input
                    name="note"
                    required
                    placeholder="e.g. Starbucks Coffee"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={formState.note}
                    onChange={(e) => handleFormChange("note", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                      Amount (Rs)
                    </label>
                    <input
                      name="amount"
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={formState.amount}
                      onChange={(e) => handleFormChange("amount", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none cursor-pointer"
                      value={formState.type}
                      onChange={(e) => handleFormChange("type", e.target.value)}
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={formState.date}
                    onChange={(e) => handleFormChange("date", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none cursor-pointer"
                    value={formState.categoryId}
                    onChange={(e) => handleFormChange("categoryId", e.target.value)}
                  >
                    <option value="" disabled>
                      Select {formState.type} category
                    </option>
                    {filteredFormCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  {editingTransaction ? "Update Transaction" : "Save Transaction"}
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

