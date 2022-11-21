import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "./state/auth/authSlice";
import { logOut } from "./state/auth/auth.actions";

// import Footer from "./components/footer/footer.component";
// import LoginPage from "./pages/login/login.page";
// import LandingPage from "./pages/landing/landing.page";
// import SignupPage from "./pages/signup/signup.page";
// import BooksPage from "./pages/books/books.pages";

function App() {
  const dispatch = useDispatch();
  const { currentUser, isLoading, error, isAuth } = useSelector(authSelector);

  if (isLoading) return <div>...Loading</div>;

  if (error) return <div>{error}</div>;

  console.log({ isAuth });

  return (
    <div>
      <h1>HELLO WORLD</h1>
    </div>
  );

  // return (
  //   <Fragment>
  //     <Routes>
  //       <Route path="/" element={<LandingPage />} />
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/signup" element={<SignupPage />} />
  //       <Route path="/books" element={<BooksPage />} />
  //     </Routes>

  //     <Footer />
  //   </Fragment>
  // );
}

export default App;
