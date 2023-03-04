import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import Footer from "./components/footer/footer.component";
import LoginPage from "./pages/login/login.page";
import LandingPage from "./pages/landing/landing.page";
import SignupPage from "./pages/signup/signup.page";
import BooksPage from "./pages/books/books.pages";
import BookDetails from "./pages/books/bookDetails.pages";

// import ProtectedRoute from "./hoc/protectedRoute/protectedRoute.hoc";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<BooksPage />} />
        </Route> */}
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;
