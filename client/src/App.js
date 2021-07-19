import { Switch, Route } from "react-router-dom";

// PAGES
import LandingPage from "./pages/Landing/landing.pages";
import AdminSignupPage from './pages/Auth/Admin/adminSignup.pages'

// COMPONENTS
import Copyright from "./components/common/Copyright/copyright.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/auth/admin/signup" component={AdminSignupPage} />
      </Switch>
      <Copyright />
    </div>
  );
}

export default App;
