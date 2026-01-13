import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ReceiptPage() {
  const [payment, setPayment] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedPayment = JSON.parse(localStorage.getItem("lastPayment"));
    setPayment(savedPayment);
  }, []);

  if (!payment) return <p>Memuat struk...</p>;

  return (
    <div className="checkout-container">
      <h1>Pembayaran Selesai</h1>

      <h2>Struk Belanja</h2>
      <ul>
        {payment.order.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} <span>Rp {item.price.toLocaleString("id-ID")}</span>
          </li>
        ))}
      </ul>

      <h2>Metode Pembayaran: {payment.paymentMethod}</h2>
      <h3>Total: Rp {payment.totalPrice.toLocaleString("id-ID")}</h3>

      <button className="btn-pay" onClick={() => router.push("/")}>
        Kembali ke Menu
      </button>
    </div>
  );
}
