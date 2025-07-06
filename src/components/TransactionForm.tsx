// components/TransactionForm.tsx
import { useState } from "react";

type Transaction = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
};

type Props = {
  onAdd: (txn: Transaction) => void;
};

export default function TransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(form.amount),
        description: form.description,
        date: form.date,
      }),
    });

    const newTxn = await res.json();
    onAdd(newTxn); // ✅ correctly calls the onAdd function with newTxn
    setForm({ amount: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="number"
    placeholder="Amount"
    value={form.amount}
    onChange={(e) => setForm({ ...form, amount: e.target.value })}
    className="w-full px-4 py-2 rounded border bg-zinc-800 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
  
  <input
    type="text"
    placeholder="Description"
    value={form.description}
    onChange={(e) => setForm({ ...form, description: e.target.value })}
    className="w-full px-4 py-2 rounded border bg-zinc-800 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
  <input
    type="date"
    value={form.date}
    onChange={(e) => setForm({ ...form, date: e.target.value })}
    className="w-full px-4 py-2 rounded border bg-zinc-800 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
  

  <button
    type="submit"
    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-medium w-full"
  >
    Add
  </button>
</form>

  );
}
