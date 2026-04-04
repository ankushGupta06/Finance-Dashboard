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

export default function TransactionsPage() {
  const { role } = useRole();
  const { addAlert } = useAlert();

  // --- PAGINATION STATE ---
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // --- DATA STATE ---
  // We repeat the initialTransactions twice to ensure we have enough data for multiple pages
  const [localTransactions, setLocalTransactions] = useState([
    ...initialTransactions,
    ...initialTransactions,
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FILTERING LOGIC ---
  const filteredTransactions = useMemo(() => {
    return localTransactions.filter((t) => {
      const matchesSearch = t.note
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || t.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [localTransactions, searchTerm, selectedCategory]);

  // --- PAGINATION CALCULATION ---
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // --- HANDLERS ---
  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const amount = Number(formData.get("amount"));
      const note = (formData.get("note") as string)?.trim();
      const categoryId = formData.get("categoryId") as string;
      const type = formData.get("type") as "income" | "expense";

      // ✅ Validation
      if (!note) {
        addAlert("Note is required ⚠️", "error");
        return;
      }

      if (!amount || amount <= 0) {
        addAlert("Amount must be greater than 0 ⚠️", "error");
        return;
      }

      if (!categoryId) {
        addAlert("Please select a category ⚠️", "error");
        return;
      }

      const newTx = {
        id: `t-${Date.now()}`,
        amount,
        type,
        categoryId,
        date: new Date().toISOString().split("T")[0],
        note,
      };

      setLocalTransactions((prev) => [newTx, ...prev]);
      setCurrentPage(1);
      setIsModalOpen(false);

      // ✅ Success Alert
      addAlert("Transaction added successfully ✅", "success");
    } catch (error) {
      console.error(error);
      addAlert("Something went wrong while adding transaction ❌", "error");
    }
  };

  const exportToCSV = () => {
    try {
      if (!localTransactions.length) {
        addAlert("No transactions to export ⚠️", "error");
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

      // cleanup
      window.URL.revokeObjectURL(url);

      // ✅ Success Alert
      addAlert("CSV exported successfully 📁", "success");
    } catch (error) {
      console.error(error);
      addAlert("Failed to export CSV ❌", "error");
    }
  };

  // Reset to page 1 when search or filter changes
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
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
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Add Transaction
                </button>
              )}
            </div>
          </div>

          {/* Search/Filter Bar */}
          <div className="bg-white p-4 rounded-[28px] border border-gray-50 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by note..."
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
          </div>

          {/* Table & Pagination Container */}
          <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm">
            <TransactionList
              transactions={paginatedTransactions}
              categories={categories}
            />

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-50 gap-4">
                <p className="text-xs font-bold text-gray-400">
                  Showing{" "}
                  <span className="text-gray-800">
                    {paginatedTransactions.length}
                  </span>{" "}
                  of {filteredTransactions.length} transactions
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
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
                          currentPage === i + 1
                            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-2 rounded-xl border border-gray-100 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- ADD TRANSACTION MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-md p-10 relative shadow-2xl animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-black text-gray-800 mb-6">
                New Transaction
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      name="amount"
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                      Type
                    </label>
                    <select
                      name="type"
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none cursor-pointer"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
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
                  Save Transaction
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
