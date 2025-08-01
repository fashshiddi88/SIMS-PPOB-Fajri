"use client";

import { useState, useEffect, useCallback } from "react";
import type { Transaction } from "../types/auth";
import TransactionCard from "./TransactionCard";

interface TransactionHistoryProps {
  title?: string;
  limit?: number;
  showMoreText?: string;
  onLoadMore?: (offset: number, limit: number) => Promise<Transaction[]>;
}

export default function TransactionHistory({
  title = "Semua Transaksi",
  limit = 5,
  showMoreText = "Show more",
  onLoadMore,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadTransactions = useCallback(
    async (currentOffset: number, currentLimit: number) => {
      if (!onLoadMore) return;

      setLoading(true);
      try {
        const newTransactions = await onLoadMore(currentOffset, currentLimit);

        if (currentOffset === 0) {
          setTransactions(newTransactions);
        } else {
          setTransactions((prev) => [...prev, ...newTransactions]);
        }

        setHasMore(newTransactions.length === currentLimit);
        setOffset(currentOffset);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    loadTransactions(0, limit);
  }, [limit, loadTransactions]);

  const handleShowMore = () => {
    loadTransactions(offset + limit, limit);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.invoice_number}
            transaction={transaction}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="text-red-500 hover:text-red-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : showMoreText}
          </button>
        </div>
      )}

      {!hasMore && transactions.length > 0 && (
        <div className="text-center mt-6 text-gray-500 text-sm">
          Tidak ada transaksi lainnya
        </div>
      )}
    </div>
  );
}
