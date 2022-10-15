import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/landing.page";
import Footer from "./components/footer/footer.component";
import { Fragment } from "react";
import LoginPage from "./pages/login/login.page";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;
