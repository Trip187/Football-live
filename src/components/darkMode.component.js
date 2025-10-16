import React, { Fragment, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Moon from "./moon_24.png";
import "./darkMode.styles.css";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeClass, setThemeClass] = useState("lightTheme");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");

    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setThemeClass("dark-Theme");
      setIsDarkMode(true);
    } else {
      document.body.setAttribute("data-theme", "light");
      setThemeClass("light-Theme");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle between dark and light
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("selectedTheme", "light");

      setIsDarkMode(false);
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("selectedTheme", "dark");

      setIsDarkMode(true);
    }
  };
  const toggleImage = () => {
    if (themeClass === "lightTheme") {
      setThemeClass("light-Theme");
    } else {
      setThemeClass("dark-Theme");
    }
  };
  return (
    <Fragment>
      {" "}
      <Form
        style={{
          display: "flex",
          alignItems: "center",
          margin: "auto",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="DARK MODE"
          onClick={toggleTheme}
          className="form-check"
        />
      </Form>
      <img
        src={Moon}
        alt="Toggle theme"
        className={isDarkMode ? "dark-Theme" : "light-Theme"}
        onClick={toggleImage}
        style={{ position: "relative", right: "400px" }}
      />
    </Fragment>
  );
};

export default DarkMode;
