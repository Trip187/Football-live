import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../utils/firebase.utils";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DarkMode from "./darkMode.component";

import classes from "./navigation.styles.module.css";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to="/" className={classes["nav-link"]}>
            HOME
          </Link>

          <nav>
            <ul>
              <li>
                <Link to="/news" className={classes["nav-link"]}>
                  NEWS
                </Link>
              </li>
              {!currentUser && (
                <li>
                  <Link to="/login" className={classes["nav-link"]}>
                    LOGIN
                  </Link>
                </li>
              )}
              {currentUser && (
                <li>
                  <span
                    onClick={signOutHandler}
                    className={classes["nav-link"]}
                    style={{ cursor: "pointer" }}
                  >
                    SIGN OUT
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* 🌙 Dark mode switch on the right */}
        <DarkMode />
      </header>

      {/* ✅ Add margin to prevent content from hiding under fixed header */}
      <main className={classes["content-offset"]}>
        <Outlet />
      </main>
    </Fragment>
  );
};
export default Navigation;
