import React from "react";

interface MenuItem {
  name: string;
  price: number;
  description: string;
  course: string;
}

interface MenuItemsPageProps {
  items: MenuItem[];
  onBack: () => void;
}

const MenuItemsPage: React.FC<MenuItemsPageProps> = ({ items, onBack }) => {
  // Group items by course for better organization
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.course]) {
      acc[item.course] = [];
    }
    acc[item.course].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const courses = Object.keys(groupedItems);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Menu Items</h1>
        <button onClick={onBack} style={styles.backBtn}>
          ← Back to Main Menu
        </button>
      </div>

      {items.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No items added yet.</p>
          <button onClick={onBack} style={styles.backBtn}>
            ← Back to Main Menu
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          {/* Show all items grouped by course */}
          {courses.map(course => (
            <div key={course} style={styles.courseSection}>
              <h2 style={styles.courseTitle}>{course}</h2>
              <div style={styles.list}>
                {groupedItems[course].map((item, index) => (
                  <div 
                    key={index} 
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div style={styles.cardHeader}>
                      <strong style={styles.name}>{item.name}</strong>
                      <span style={styles.price}>R{item.price.toFixed(2)}</span>
                    </div>
                    <p style={styles.description}>{item.description}</p>
                    <div style={styles.cardFooter}>
                      <span style={styles.courseBadge}>{item.course}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap" as const,
    gap: "15px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#0b5ed7",
    margin: 0,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyText: {
    color: "#888",
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  courseSection: {
    marginBottom: "40px",
  },
  courseTitle: {
    fontSize: "2rem",
    color: "#08306b",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #0b5ed7",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px",
    alignItems: "start",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    border: "1px solid #e1e5e9",
    height: "fit-content",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    gap: "15px",
  },
  name: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#08306b",
    flex: 1,
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#0b5ed7",
    whiteSpace: "nowrap",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "15px",
    lineHeight: "1.5",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseBadge: {
    fontSize: "0.85rem",
    fontStyle: "italic",
    color: "#777",
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  backBtn: {
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0b5ed7",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
  },
};

// Add hover effects for the back button
const backBtnHover = {
  backgroundColor: "#0a4db6",
  transform: "translateY(-1px)",
};

export default MenuItemsPage;