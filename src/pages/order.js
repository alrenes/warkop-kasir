import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [orderType, setOrderType] = useState("Ditempat"); // default makan di tempat
  const router = useRouter();

  // Ambil pesanan dari localStorage saat halaman load
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("cart")) || [];
    setOrder(savedOrder);
  }, []);

  // Update jumlah item
  const updateQuantity = (id, value) => {
    setOrder((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, value) } : item
      )
    );
  };

  // Hapus item
  const removeItem = (id) => {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  };

  // Hitung total harga
  const totalPrice = order.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Bayar
  const handlePayment = () => {
    localStorage.setItem(
      "lastPayment",
      JSON.stringify({ order, paymentMethod, totalPrice, orderType })
    );
    localStorage.removeItem("cart"); // kosongkan cart
    router.push("/receipt");
  };

  if (order.length === 0)
    return (
      <div className="checkout-container">
        <h1>Pesanan Kosong</h1>
        <button className="btn-pay" onClick={() => router.push("/")}>
          Kembali ke Menu
        </button>
      </div>
    );

  return (
    <div className="checkout-container">
      <h1>Kasir - Pesanan Aktif</h1>

      <h2>Daftar Pesanan</h2>
      <ul>
        {order.map((item) => (
          <li key={item.id}>
            <span>
              {item.name} x{" "}
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                style={{ width: "50px", marginRight: "8px" }}
              />
            </span>
            <span>
              Rp {item.price.toLocaleString("id-ID")}{" "}
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginLeft: "10px",
                  background: "#ff5722",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "2px 6px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </span>
          </li>
        ))}
      </ul>

      <h2>Pilih Jenis Pesanan</h2>
      <label>
        <input
          type="radio"
          name="orderType"
          value="Ditempat"
          checked={orderType === "Ditempat"}
          onChange={() => setOrderType("Ditempat")}
        />{" "}
        Makan di Tempat
      </label>
      <label style={{ marginLeft: "20px" }}>
        <input
          type="radio"
          name="orderType"
          value="Bungkus"
          checked={orderType === "Bungkus"}
          onChange={() => setOrderType("Bungkus")}
        />{" "}
        Bungkus
      </label>

      <h2>Metode Pembayaran</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Tunai">Tunai</option>
        <option value="E-Wallet">E-Wallet</option>
      </select>

      <h3>Total: Rp {totalPrice.toLocaleString("id-ID")}</h3>

      <button className="btn-pay" onClick={handlePayment}>
        Lakukan Pembayaran
      </button>
    </div>
  );
}
