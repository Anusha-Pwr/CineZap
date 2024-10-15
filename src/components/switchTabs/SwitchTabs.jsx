import React, { useState, useEffect } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const updateLeftPosition = (index) => {
    const tabWidth = document.querySelector(".tabItem").offsetWidth;
    setLeft(index * tabWidth);
  };

  function activeTabHandler(tab, index) {
    updateLeftPosition(index);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab);
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateLeftPosition(selectedTab); // Recalculate when window is resized
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTab]); // Recalculate when the selectedTab changes

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            onClick={() => activeTabHandler(tab, index)}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
