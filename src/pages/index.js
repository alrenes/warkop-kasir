import { useState } from "react";
import { useRouter } from "next/router";
import menuData from "../data/menuData";

export default function Home() {
  const [openCategory, setOpenCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const router = useRouter();

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

const addToCart = (item) => {
  setCart((prev) => {
    const exist = prev.find((i) => i.id === item.id);
    let newCart;
    if (exist) {
      newCart = prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...prev, { ...item, quantity: 1 }];
    }
    // simpan ke localStorage setiap update
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
  });

  setShowNotif(true);
  setTimeout(() => setShowNotif(false), 1500);
};


  const totalItems = cart.reduce((a, i) => a + i.quantity, 0);

const proceedToOrder = () => {
  // simpan cart sementara di localStorage
  localStorage.setItem("currentOrder", JSON.stringify(cart)); // sebelumnya "cart"
  router.push("/order");
};


  const getCategoryClass = (category) => {
    if (category === "Makanan") return "cat-makanan";
    if (category === "Minuman") return "cat-minuman";
    if (category === "Snack") return "cat-snack";
    return "";
  };

  return (
    <div className="home-container">
      {/* Tombol Lihat Pesanan */}
      {cart.length > 0 && (
        <div className="view-order-btn" onClick={proceedToOrder}>
          Lihat Pesanan ({totalItems})
        </div>
      )}

      {/* Notifikasi Tambah */}
      {showNotif && <div className="notif">Berhasil ditambahkan!</div>}

      <h1 className="home-title">Warkop Bang Fen</h1>
      <p className="home-desc">Daftar menu dan harga</p>

      {menuData.map((group) => {
        const isOpen = openCategory === group.category;
        const itemsToShow = isOpen ? group.items : group.items.slice(0, 2);

        return (
          <div key={group.category} className="category-section">
            <div
              className={`category-header ${getCategoryClass(group.category)}`}
              onClick={() => toggleCategory(group.category)}
            >
              <span className="category-bar"></span>
              <h2>{group.category}</h2>
            </div>

            <div className="menu-grid">
              {itemsToShow.map((item) => (
                <div key={item.id} className="menu-card">
                  {item.promo && <span className="badge">Promo</span>}
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h3>{item.name}</h3>
                  <p>Rp {item.price.toLocaleString("id-ID")}</p>

                  {isOpen && (
                    <button
                      className="btn-tambah"
                      onClick={() => addToCart(item)}
                    >
                      Tambah
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
