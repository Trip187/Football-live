import HomePage from "./pages/home-page.component";
import NewsPage from "./pages/news-page.component";
import LoginPage from "./pages/login-page.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation.component";
import { Fragment } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/user.context";
import { onAuthStateChangedListener } from "./utils/firebase.utils";

const App = () => {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
