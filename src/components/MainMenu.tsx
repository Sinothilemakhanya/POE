import React, { useState } from "react";
import { MenuItem } from "../App";

// Import images for each category
import startersImage from "../assets/images/starter.jpg";
import mainMealImage from "../assets/images/main.jpg";
import dessertsImage from "../assets/images/desserts.jpg";
import filterImage from "../assets/images/splash.jpg";

interface MainMenuProps {
  onSelectCategory: (category: MenuItem["course"]) => void;
  onOpenChefPanel: () => void;
  onOpenFilterPage: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onSelectCategory,
  onOpenChefPanel,
  onOpenFilterPage,
}) => {
  const categories: { name: MenuItem["course"]; image: string }[] = [
    { name: "Starters", image: startersImage },
    { name: "Main Meal", image: mainMealImage },
    { name: "Desserts", image: dessertsImage },
  ];

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const getCategoryColor = (categoryName: MenuItem["course"]) => {
    switch (categoryName) {
      case "Starters":
        return "#4CAF50";
      case "Main Meal":
        return "#FF5722";
      case "Desserts":
        return "#9C27B0";
      default:
        return "#1e6ba0";
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Maison Christoffel</h1>

      <div style={styles.categories}>
        {categories.map((cat) => (
          <div key={cat.name} style={styles.categoryWrapper}>
            <div style={styles.imageWrapper}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  ...styles.categoryImage,
                  transform: hoveredButton === cat.name ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div style={styles.overlay}></div>
              <button
                style={{
                  ...styles.categoryBtn,
                  borderColor: getCategoryColor(cat.name),
                  transform: hoveredButton === cat.name ? "translateY(-5px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredButton(cat.name)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => onSelectCategory(cat.name)}
              >
                {cat.name}
              </button>
            </div>
          </div>
        ))}

        {/* Filter All Button */}
        <div style={styles.categoryWrapper}>
          <div style={styles.imageWrapper}>
            <img
              src={filterImage}
              alt="Filter"
              style={{
                ...styles.categoryImage,
                transform: hoveredButton === "Filter" ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div style={styles.overlay}></div>
            <button
              style={{
                ...styles.categoryBtn,
                borderColor: "#1976d2",
                transform: hoveredButton === "Filter" ? "translateY(-5px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredButton("Filter")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={onOpenFilterPage}
            >
              Filter All
            </button>
          </div>
        </div>
      </div>

      <button style={styles.chefBtn} onClick={onOpenChefPanel}>
        Open Chef Panel
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #0f2b46, #1e3c60)",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: 40,
    textShadow: "2px 2px 15px rgba(0,0,0,0.5)",
  },
  categories: {
    display: "flex",
    gap: 30,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  categoryWrapper: {
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    marginBottom: 12,
  },
  categoryImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
    transition: "transform 0.3s ease",
    display: "block",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
  },
  categoryBtn: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: 8,
    border: "2px solid white",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "black",
    fontWeight: 600,
    transition: "all 0.3s ease",
    zIndex: 2,
  },
  chefBtn: {
    marginTop: 30,
    padding: "14px 30px",
    fontSize: "1.1rem",
    backgroundColor: "#bf0bd7",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    color: "white",
    fontWeight: 700,
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    transition: "0.3s ease",
  },
};

export default MainMenu;
