import { Switch, Route } from "react-router-dom";

// PAGES
import LandingPage from "./pages/Landing/landing.pages";
import AdminSignupPage from "./pages/Auth/admin/adminSignup.pages";
import AdminLoginPage from "./pages/Auth/admin/adminLogin.pages";
import UserSignupPage from "./pages/Auth/user/userSignup.pages";
import UserLoginPage from "./pages/Auth/user/userLogin.page";

// COMPONENTS
import Copyright from "./components/common/Copyright/copyright.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/auth/admin/signup" component={AdminSignupPage} />
        <Route exact path="/auth/admin/login" component={AdminLoginPage} />
        <Route exact path="/auth/user/signup" component={UserSignupPage} />
        <Route exact path="/auth/user/login" component={UserLoginPage} />
      </Switch>
      <Copyright />
    </div>
  );
}

export default App;
