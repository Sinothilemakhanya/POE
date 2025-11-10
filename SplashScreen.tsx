import React, { useEffect } from "react";
import splashImage from "../assets/images/splash.jpg";

interface SplashProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.container}>
      {/* Keyframes for spinner and fade-in */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Splash Image */}
      <img src={splashImage} alt="Splash" style={styles.image} />

      {/* Title */}
      <h1 style={styles.title}>Welcome to Maison Christoffel</h1>

      {/* Spinner */}
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0b5ed7, #6f8092ff)", // Gradient background
    overflow: "hidden",
  },
  image: {
    width: 220,
    height: 220,
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    animation: "fadeIn 1s ease forwards",
    marginBottom: 20,
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    textShadow: "2px 2px 12px rgba(0,0,0,0.4)",
    animation: "fadeIn 1.2s ease forwards",
    marginBottom: 30,
  },
  spinner: {
    width: 50,
    height: 50,
    border: "6px solid rgba(255,255,255,0.3)",
    borderTop: "6px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default SplashScreen;
