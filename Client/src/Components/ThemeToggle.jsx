import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "caramellatte"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(
      theme === "caramellatte"
        ? "synthwave"
        : "caramellatte"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle fixed top-5 right-5 z-50"
    >
      {theme === "caramellatte" ? (
        <FaMoon />
      ) : (
        <FaSun />
      )}
    </button>
  );
};

export default ThemeToggle;