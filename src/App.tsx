import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainMenu from "./components/MainMenu";
import CategoryPage from "./components/CategoryPage";
import ChefPanel from "./components/ChefPanel";
import FilterByCoursePage from "./components/FilterByCoursePage";

export interface MenuItem {
  name: string;
  course: "Starters" | "Main Meal" | "Desserts";
  price: number;
  description: string;
}

const App: React.FC = () => {
  // Splash
  const [showSplash, setShowSplash] = useState(true);

  // Menu and category state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuItem["course"] | null>(null);

  // Panel state
  const [showChefPanel, setShowChefPanel] = useState(false);
  const [showFilterPage, setShowFilterPage] = useState(false);

  // === Splash Screen ===
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // === Chef Panel ===
  if (showChefPanel) {
    return (
      <ChefPanel
        menuItems={menuItems}
        onBack={() => setShowChefPanel(false)}
        onUpdateMenuItems={(items) => setMenuItems(items)}
      />
    );
  }

  // === Filter By Course Page ===
  if (showFilterPage) {
    return (
      <FilterByCoursePage
        menuItems={menuItems}
        onBack={() => setShowFilterPage(false)}
      />
    );
  }

  // === Category Page ===
  if (selectedCategory) {
    const itemsInCategory = menuItems.filter(
      (item) => item.course === selectedCategory
    );
    return (
      <CategoryPage
        category={selectedCategory}
        items={itemsInCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  // === Main Menu ===
  return (
    <MainMenu
      onSelectCategory={setSelectedCategory}
      onOpenChefPanel={() => setShowChefPanel(true)}
      onOpenFilterPage={() => setShowFilterPage(true)}
    />
  );
};

export default App;
