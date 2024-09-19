import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  function activeTabHandler(tab, index) {
    setLeft(index * 100);  // set the 'left' of movingBg 
    setTimeout(() => {
      setSelectedTab(index); // set selected tab so as to change the color of tabItem
    }, 300);
    onTabChange(tab);
  }

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
