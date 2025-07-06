import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "../components/MonthlyBarChart";

type Transaction = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (newTxn: Transaction) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTxn),
    });

    await fetchTransactions(); // 🔁 Refresh after add
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    await fetchTransactions(); // 🔁 Refresh after delete
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-start py-10">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">
          💰 Personal Finance Tracker
        </h1>

        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
        <MonthlyBarChart transactions={transactions} />
      </div>
    </div>
  );
}
