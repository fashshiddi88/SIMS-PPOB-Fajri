export interface Transaction {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const date = dateObj.toLocaleDateString("id-ID");
    const time = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} - ${time}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div
            className={`text-lg font-semibold ${
              transaction.transaction_type === "TOPUP"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {transaction.transaction_type === "TOPUP" ? "+" : "-"}{" "}
            {formatCurrency(transaction.total_amount)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(transaction.created_on)}
          </div>
        </div>
        <div className="text-sm text-gray-700 font-medium">
          {transaction.description}
        </div>
      </div>
    </div>
  );
}
