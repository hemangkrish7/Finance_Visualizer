import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Transaction = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
};

export default function MonthlyBarChart({ transactions }: Props) {
  const monthlyData: { [key: string]: number } = {};

  transactions.forEach((txn) => {
    const month = new Date(txn.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + txn.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="bg-zinc-800 p-4 rounded mt-6">
      <h2 className="text-lg font-bold mb-4">📊 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="total" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
