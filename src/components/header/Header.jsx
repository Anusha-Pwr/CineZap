import React, { useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/Designer.png";
import { HiOutlineSearch } from "react-icons/hi";
import "./style.scss";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false); // for toggling the icon from close to menu icon and vice versa
  const [showSearch, setShowSearch] = useState(false); // toggling the search bar
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function openSearch() {
    setMobileMenu(false);
    setShowSearch(true);
  }

  function openMobileMenu() {
    setMobileMenu(true);
    setShowSearch(false);
  }

  function searchQueryHandler(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          <li className="menuItem" onClick={openSearch}>
            <HiOutlineSearch />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
