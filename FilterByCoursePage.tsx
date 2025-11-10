import React, { useState } from "react";
import { MenuItem } from "../App";

// Optional: import a placeholder image for items
import placeholderImage from "../assets/images/splash.jpg";

interface FilterByCoursePageProps {
  menuItems: MenuItem[];
  onBack: () => void;
}

const FilterByCoursePage: React.FC<FilterByCoursePageProps> = ({ menuItems, onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("All");

  const filteredItems =
    selectedCourse === "All"
      ? menuItems
      : menuItems.filter((item) => item.course === selectedCourse);

  const courses = ["All", "Starters", "Main Meal", "Desserts"];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Filter Menu Items</h1>

      <div style={styles.filterButtons}>
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            style={{
              ...styles.courseBtn,
              backgroundColor: selectedCourse === course ? "#4caf50" : "#eee",
              color: selectedCourse === course ? "#fff" : "#000",
            }}
          >
            {course}
          </button>
        ))}
      </div>

      <div style={styles.itemsGrid}>
        {filteredItems.length === 0 ? (
          <p style={styles.noItems}>No items found.</p>
        ) : (
          filteredItems.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.imageWrapper}>
                <img
                  src={placeholderImage}
                  alt={item.name}
                  style={styles.itemImage}
                />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemDesc}>{item.description}</p>
                <p style={styles.itemCourse}>Course: {item.course}</p>
                <p style={styles.itemPrice}>R{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={onBack} style={styles.backBtn}>
        ← Back
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "40px 20px",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #0f2b46, #1e3c60)",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: 30,
    textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
  },
  filterButtons: {
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
    gap: 15,
    flexWrap: "wrap",
  },
  courseBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 25,
  },
  card: {
    backgroundColor: "#ffffff20",
    borderRadius: 15,
    overflow: "hidden",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  cardContent: {
    padding: 15,
    textAlign: "left",
  },
  itemName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: 5,
  },
  itemDesc: {
    fontSize: "0.95rem",
    color: "#ddd",
    marginBottom: 5,
  },
  itemCourse: {
    fontSize: "0.85rem",
    color: "#bbb",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#4caf50",
  },
  noItems: {
    fontSize: "1.2rem",
    color: "#ccc",
    marginTop: 20,
  },
  backBtn: {
    marginTop: 40,
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#bf0bd7",
    color: "white",
    fontWeight: 600,
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    transition: "0.3s ease",
  },
};

export default FilterByCoursePage;
