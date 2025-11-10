import React, { useState } from "react";
import { MenuItem } from "../App";

// Optional placeholder image for dishes
import placeholderImage from "../assets/images/desserts.jpg";

interface CategoryPageProps {
  category: string;
  items: MenuItem[];
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, items, onBack }) => {
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const defaultItems: Record<string, MenuItem[]> = {
    Starters: [
      { name: "Garlic Prawns", price: 89.99, description: "Fresh prawns in garlic butter sauce", course: "Starters" },
      { name: "Bruschetta", price: 45.99, description: "Toasted bread with tomatoes and basil", course: "Starters" },
      { name: "Caesar Salad", price: 65.99, description: "Fresh lettuce with Caesar dressing and croutons", course: "Starters" },
    ],
    "Main Meal": [
      { name: "Grilled Salmon", price: 159.99, description: "Atlantic salmon with lemon butter", course: "Main Meal" },
      { name: "Beef Steak", price: 189.99, description: "Prime beef steak with mushroom sauce", course: "Main Meal" },
      { name: "Chicken Parmesan", price: 129.99, description: "Breaded chicken with tomato sauce and cheese", course: "Main Meal" },
    ],
    Desserts: [
      { name: "Chocolate Cake", price: 59.99, description: "Rich chocolate cake with ganache", course: "Desserts" },
      { name: "Cheesecake", price: 65.99, description: "New York style cheesecake with berry compote", course: "Desserts" },
      { name: "Ice Cream Sundae", price: 49.99, description: "Vanilla ice cream with chocolate sauce and nuts", course: "Desserts" },
    ],
  };

  const displayItems = items.length > 0 ? items : defaultItems[category] || [];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.name === item.name);
      if (existing) {
        return prev.map(ci => ci.item.name === item.name ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => setCart(prev => prev.filter(ci => ci.item.name !== name));
  const updateQuantity = (name: string, qty: number) => {
    if (qty < 1) return removeFromCart(name);
    setCart(prev => prev.map(ci => ci.item.name === name ? { ...ci, quantity: qty } : ci));
  };

  const total = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
        <h1 style={styles.title}>{category}</h1>
        <div style={styles.cartSummary}>Cart {cart.reduce((sum, ci) => sum + ci.quantity, 0)} items</div>
      </div>

      <div style={styles.content}>
        {/* Menu Items */}
        <div style={styles.menuSection}>
          {displayItems.length === 0 ? (
            <div style={styles.emptyState}>No dishes available.</div>
          ) : (
            <div style={styles.menuGrid}>
              {displayItems.map((item, idx) => (
                <div key={idx} style={styles.menuCard}>
                  <img src={placeholderImage} alt={item.name} style={styles.itemImage} />
                  <div style={styles.cardContent}>
                    <div style={styles.itemHeader}>
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <span style={styles.itemPrice}>R{item.price.toFixed(2)}</span>
                    </div>
                    <p style={styles.itemDescription}>{item.description}</p>
                  </div>
                  <button style={styles.addBtn} onClick={() => addToCart(item)}>
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div style={styles.orderSection}>
            <div style={styles.orderSummary}>
              <h2 style={styles.orderTitle}>Order Summary</h2>
              {cart.map((ci, idx) => (
                <div key={idx} style={styles.orderItem}>
                  <div style={styles.orderItemInfo}>
                    <span>{ci.item.name}</span>
                    <span>R{(ci.item.price * ci.quantity).toFixed(2)}</span>
                  </div>
                  <div style={styles.quantityControls}>
                    <button onClick={() => updateQuantity(ci.item.name, ci.quantity - 1)} style={styles.quantityBtn}>-</button>
                    <span style={styles.quantity}>{ci.quantity}</span>
                    <button onClick={() => updateQuantity(ci.item.name, ci.quantity + 1)} style={styles.quantityBtn}>+</button>
                    <button onClick={() => removeFromCart(ci.item.name)} style={styles.removeBtn}>🗑️</button>
                  </div>
                </div>
              ))}
              <div style={styles.orderTotal}>
                <span>Total:</span>
                <span>R{total.toFixed(2)}</span>
              </div>
              <button style={styles.checkoutBtn}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", fontFamily: "Poppins, sans-serif", backgroundColor: "#0f2b46", padding: "30px 20px", color: "white" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 15 },
  title: { fontSize: "2.5rem", fontWeight: 700, flex: 1, textAlign: "center", color: "#4caf50" },
  backBtn: { padding: "10px 20px", backgroundColor: "#6c757d", border: "none", borderRadius: 8, cursor: "pointer", color: "white", fontWeight: 600 },
  cartSummary: { backgroundColor: "#0b5ed7", color: "white", padding: "10px 15px", borderRadius: 20, fontWeight: 600 },
  content: { display: "flex", gap: 30, maxWidth: 1200, margin: "0 auto", flexDirection: "row" },
  menuSection: { flex: 2 },
  orderSection: { flex: 1, minWidth: 300 },
  emptyState: { textAlign: "center", color: "#ddd", padding: 60, fontSize: 16 },
  menuGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 },
  menuCard: { backgroundColor: "white", borderRadius: 12, padding: 15, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#212529", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", transition: "transform 0.2s" },
  itemImage: { width: "100%", height: 150, objectFit: "cover", borderRadius: 8, marginBottom: 10 },
  cardContent: {},
  itemHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  itemName: { fontSize: 18, fontWeight: 700 },
  itemPrice: { color: "#0b5ed7", fontWeight: 700 },
  itemDescription: { fontSize: 14, color: "#495057" },
  addBtn: { padding: 12, backgroundColor: "#0b5ed7", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" },
  orderSummary: { backgroundColor: "white", borderRadius: 12, padding: 20, color: "#212529", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", position: "sticky", top: 20 },
  orderTitle: { fontSize: 20, fontWeight: 700, marginBottom: 15, textAlign: "center" },
  orderItem: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  orderItemInfo: { display: "flex", justifyContent: "space-between", gap: 15, flex: 1 },
  quantityControls: { display: "flex", gap: 5, alignItems: "center" },
  quantityBtn: { padding: "4px 8px", borderRadius: 6, border: "none", cursor: "pointer" },
  quantity: { padding: "4px 10px", fontWeight: 600, minWidth: 30, textAlign: "center" },
  removeBtn: { border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: 16 },
  orderTotal: { display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, marginTop: 10, borderTop: "2px solid #0b5ed7", paddingTop: 10 },
  checkoutBtn: { width: "100%", padding: 15, backgroundColor: "#198754", border: "none", borderRadius: 8, fontWeight: 700, color: "white", cursor: "pointer", marginTop: 10 },
};

export default CategoryPage;
