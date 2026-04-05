import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { transactions as seededTransactions } from "../data/transactions";

type TransactionRecord = (typeof seededTransactions)[number];

type TransactionsContextValue = {
  transactions: TransactionRecord[];
  setTransactions: Dispatch<SetStateAction<TransactionRecord[]>>;
};

const STORAGE_KEY = "zorvyn-transactions";

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

const getInitialTransactions = () => {
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

export const TransactionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transactions, setTransactions] =
    useState<TransactionRecord[]>(getInitialTransactions);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
    }),
    [transactions],
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
