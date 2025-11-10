import React, { useState } from "react";
import { MenuItem } from "../App";

// Import background image
import backgroundImage from "../assets/images/background.jpg";

interface ChefPanelProps {
  menuItems: MenuItem[];
  onBack: () => void;
  onUpdateMenuItems: (items: MenuItem[]) => void;
}

const ChefPanel: React.FC<ChefPanelProps> = ({ menuItems, onBack, onUpdateMenuItems }) => {
  const [localMenu, setLocalMenu] = useState<MenuItem[]>(menuItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<MenuItem>({
    name: "",
    course: "Starters",
    price: 0,
    description: "",
  });

  const handleSaveItem = () => {
    if (!newItem.name.trim() || !newItem.description.trim()) return;

    const updatedMenu = [...localMenu];
    if (editingIndex !== null) {
      updatedMenu[editingIndex] = newItem;
    } else {
      updatedMenu.push(newItem);
    }

    setLocalMenu(updatedMenu);
    onUpdateMenuItems(updatedMenu);
    setNewItem({ name: "", course: "Starters", price: 0, description: "" });
    setEditingIndex(null);
  };

  const handleDeleteItem = (index: number) => {
    const updated = localMenu.filter((_, i) => i !== index);
    setLocalMenu(updated);
    onUpdateMenuItems(updated);
  };

  const handleEditItem = (index: number) => {
    setEditingIndex(index);
    setNewItem(localMenu[index]);
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <h2 style={styles.title}>Chef Control Panel</h2>
      </div>

      {/* Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Dish Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <select
          value={newItem.course}
          onChange={(e) =>
            setNewItem({ ...newItem, course: e.target.value as MenuItem["course"] })
          }
          style={styles.select}
        >
          <option value="Starters">Starters</option>
          <option value="Main Meal">Main Meal</option>
          <option value="Desserts">Desserts</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          style={styles.textarea}
        />
        <button style={styles.addBtn} onClick={handleSaveItem}>
          {editingIndex !== null ? " Update Dish" : " Add Dish"}
        </button>
      </div>

      {/* Menu List */}
      <h3 style={styles.sectionTitle}>Current Menu</h3>
      <div style={styles.menuList}>
        {localMenu.length === 0 ? (
          <p style={styles.emptyText}>No dishes yet. Add some above!</p>
        ) : (
          localMenu.map((item, index) => (
            <div key={index} style={styles.menuCard}>
              <div style={styles.cardTop}>
                <h4 style={styles.itemName}>{item.name}</h4>
                <span style={styles.itemPrice}>R{item.price.toFixed(2)}</span>
              </div>
              <p style={styles.itemDesc}>{item.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.badge}>{item.course}</span>
                <div>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEditItem(index)}
                  >
                  | Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteItem(index)}
                  >
                   | Delete|
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Poppins, sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  title: { fontSize: "2rem", fontWeight: 700, color: "#fff", textShadow: "1px 1px 4px rgba(0,0,0,0.7)" },
  backBtn: {
    backgroundColor: "rgba(108, 117, 125, 0.8)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  form: {
    display: "grid",
    gap: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  input: { padding: 10, borderRadius: 6, border: "1px solid #ced4da", fontSize: 16 },
  select: { padding: 10, borderRadius: 6, border: "1px solid #ced4da", fontSize: 16 },
  textarea: { padding: 10, borderRadius: 6, border: "1px solid #ced4da", fontSize: 16, minHeight: 80 },
  addBtn: { backgroundColor: "#0b5ed7", color: "#fff", border: "none", borderRadius: 8, padding: 12, fontWeight: 600, cursor: "pointer" },
  sectionTitle: { fontSize: "1.5rem", fontWeight: 700, marginBottom: 15 },
  menuList: { display: "grid", gap: 15 },
  menuCard: { backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 10, padding: 15, color: "#212529" },
  cardTop: { display: "flex", justifyContent: "space-between" },
  itemName: { fontWeight: 600 },
  itemPrice: { color: "#0b5ed7", fontWeight: 600 },
  itemDesc: { color: "#555", margin: "8px 0" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  badge: { backgroundColor: "#0b5ed7", color: "#fff", padding: "4px 10px", borderRadius: 8, fontSize: 12 },
  deleteBtn: { backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: 16, marginLeft: 8 },
  editBtn: { backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: 16 },
  emptyText: { fontStyle: "italic", color: "#ddd", padding: 20, textAlign: "center" },
};

export default ChefPanel;
