import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  transactionsApi,
  type TransactionRecord,
} from "../api/transactions";

type TransactionsContextValue = {
  transactions: TransactionRecord[];
  isLoading: boolean;
  refreshTransactions: () => Promise<void>;
  createTransaction: (transaction: TransactionRecord) => Promise<void>;
  updateTransaction: (
    transactionId: string,
    updates: Partial<TransactionRecord>,
  ) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export const TransactionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const nextTransactions = await transactionsApi.getTransactions();
      setTransactions(nextTransactions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (transaction: TransactionRecord) => {
    setIsLoading(true);
    try {
      await transactionsApi.createTransaction(transaction);
      const nextTransactions = await transactionsApi.getTransactions();
      setTransactions(nextTransactions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(
    async (transactionId: string, updates: Partial<TransactionRecord>) => {
      setIsLoading(true);
      try {
        await transactionsApi.updateTransaction(transactionId, updates);
        const nextTransactions = await transactionsApi.getTransactions();
        setTransactions(nextTransactions);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteTransaction = useCallback(async (transactionId: string) => {
    setIsLoading(true);
    try {
      await transactionsApi.deleteTransaction(transactionId);
      const nextTransactions = await transactionsApi.getTransactions();
      setTransactions(nextTransactions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshTransactions();
  }, [refreshTransactions]);

  const value = useMemo(
    () => ({
      transactions,
      isLoading,
      refreshTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
    }),
    [
      transactions,
      isLoading,
      refreshTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
    ],
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }

  return context;
};

export type { TransactionRecord };
