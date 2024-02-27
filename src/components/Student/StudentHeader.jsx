import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function StudentHeader() {
  const [activeClass, setActiveClass] = useState(null);
  const [activeDropdownmenu, setActiveDropdownmenu] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  const handleBurger = (e) => {
    e.preventDefault();
    if (activeClass) {
      setActiveClass(null);
      setActiveDropdownmenu(null);
    } else {
      setActiveClass("menu-btn_active");
      setActiveDropdownmenu("navmenu__list-active");
    }
  };
  const closeDropdown = (e) => {
    e.preventDefault();
    setActiveDropdownmenu(null);
    setActiveClass(null);
  };
  return (
    <>
      <header>
        <div className="left-side">
          <nav className="navmenu">
            <div className="hamburger">
              <div className={`menu-btn ${activeClass}`} onClick={handleBurger}>
                <span className="bar"></span>
              </div>
            </div>
            <div className="mainLogo">
              <img src="https://i.ibb.co/6yyxLWN/image-9.png" alt="LwB logo" />
            </div>
            <ul className={`navmenu__list ${activeDropdownmenu}`}>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home">
                  Main
                </Link>
              </li>

              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/videos">
                  Videos
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/quiz">
                  Quizzes
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link sign-out" to="/">
                  Sign out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-side">
          <p className="active-use"> {loggedInUser.userName}</p>
        </div>
      </header>
      <h1 className="companyName">Learning without Borders</h1>
    </>
  );
}

export default StudentHeader;
