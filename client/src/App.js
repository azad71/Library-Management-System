import { Switch, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/landing.pages";
import Copyright from "./components/common/Copyright/copyright.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
      <Copyright />
    </div>
  );
}

export default App;
