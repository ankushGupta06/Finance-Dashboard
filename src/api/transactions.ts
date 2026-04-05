import { transactions as seededTransactions } from "../data/transactions";

type TransactionRecord = (typeof seededTransactions)[number];

const STORAGE_KEY = "zorvyn-transactions";
const MOCK_API_DELAY_MS = 250;

const delay = (ms = MOCK_API_DELAY_MS) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

const getStoredTransactions = (): TransactionRecord[] => {
  const savedTransactions = localStorage.getItem(STORAGE_KEY);

  if (!savedTransactions) {
    return seededTransactions;
  }

  try {
    const parsedTransactions = JSON.parse(savedTransactions);
    return Array.isArray(parsedTransactions) ? parsedTransactions : seededTransactions;
  } catch {
    return seededTransactions;
  }
};

const saveTransactions = (transactions: TransactionRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const transactionsApi = {
  async getTransactions() {
    await delay();
    return getStoredTransactions();
  },

  async createTransaction(transaction: TransactionRecord) {
    await delay();
    const nextTransactions = [transaction, ...getStoredTransactions()];
    saveTransactions(nextTransactions);
    return transaction;
  },

  async updateTransaction(transactionId: string, updates: Partial<TransactionRecord>) {
    await delay();
    let updatedTransaction: TransactionRecord | null = null;

    const nextTransactions = getStoredTransactions().map((transaction) => {
      if (transaction.id !== transactionId) {
        return transaction;
      }

      updatedTransaction = {
        ...transaction,
        ...updates,
      };

      return updatedTransaction;
    });

    saveTransactions(nextTransactions);

    if (!updatedTransaction) {
      throw new Error("Transaction not found");
    }

    return updatedTransaction;
  },

  async deleteTransaction(transactionId: string) {
    await delay();
    const nextTransactions = getStoredTransactions().filter(
      (transaction) => transaction.id !== transactionId,
    );
    saveTransactions(nextTransactions);
    return transactionId;
  },
};

export type { TransactionRecord };
