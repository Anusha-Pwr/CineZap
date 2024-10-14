import React, { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/cinezap.png";
import { HiOutlineSearch } from "react-icons/hi";
import "./style.scss";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false); // for toggling the icon between 'close' and 'menu', and displaying menu items in mobile view
  const [showSearch, setShowSearch] = useState(false); // toggling the search bar
  const [query, setQuery] = useState("");
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // for resetting the scroll if we navigate to a different page
  }, [location]);

  const controlHeaderDisplay = useCallback(() => {
    // function to add different classes to 'header' based on user's scroll position
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, mobileMenu]);

  useEffect(() => {
    // for adding and removing the 'scroll' event listener
    window.addEventListener("scroll", controlHeaderDisplay);

    return () => {
      // clean-up function remove event listener when component unmounts from the DOM
      window.removeEventListener("scroll", controlHeaderDisplay);
    };
  }, [controlHeaderDisplay]);

  const navigate = useNavigate();

  function openSearch() {
    // to display search bar
    setMobileMenu(false);
    setShowSearch(true);
  }

  function openMobileMenu() {
    // to display mobile menu items
    setMobileMenu(true);
    setShowSearch(false);
  }

  function searchQueryHandler(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  function navigationHandler(mediaType) {
    // to navigate the user to different pages
    if (mediaType === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }

    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo of CineZap website" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
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
                autoFocus
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
