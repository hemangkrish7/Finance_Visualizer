import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const txns = await Transaction.find().sort({ date: -1 });
      return res.status(200).json(txns);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
  }

  if (req.method === "POST") {
    const { amount, description, date } = req.body;
    
    const parsedDate = new Date(date); // ensure it's a valid JS Date
    const txn = await Transaction.create({ amount, description, date: parsedDate });


    if (!amount || !description || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const txn = await Transaction.create({ amount, description, date });
      return res.status(201).json(txn);
    } catch (error) {
      return res.status(500).json({ error: "Failed to add transaction" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
