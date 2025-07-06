// src/components/TransactionList.tsx

type Transaction = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
};

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
   <ul className="space-y-2">
  {transactions.map((t) => (
    <li
      key={t._id}
      className="bg-zinc-800 p-4 rounded flex justify-between items-center"
    >
      <div>
        <p className="text-lg font-semibold">₹{t.amount}</p>
        <p className="text-sm text-zinc-400">{t.description}</p>
      </div>

      <div className="text-right text-sm space-y-1">
        <p className="text-zinc-400">
          {new Date(t.date).toLocaleDateString()}
        </p>
     <button
  onClick={() => {
    if (t._id && confirm("Delete this transaction?")) {
      onDelete(t._id);
    }
  }}
  className="text-red-600 hover:text-red-800"
>
  🗑️ Delete
</button>


      </div>
    </li>
  ))}
</ul>

  );
}
