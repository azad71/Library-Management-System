import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import Footer from "./components/footer/footer.component";
import LoginPage from "./pages/login/login.page";
import LandingPage from "./pages/landing/landing.page";
import SignupPage from "./pages/signup/signup.page";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;
