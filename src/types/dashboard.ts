export interface Transaction {
  id: string;
  receiver: string;
  type: string;
  date: string;
  amount: number;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: string;
}

export interface StatItem {
  label: string;
  percentage: number;
  colorClass: string;
  icon: string;
}