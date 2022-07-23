import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Dashboard from "../components/pages/dashboard";
import App from '../app';
import Home from  '../components/pages/home';
import International from "../components/pages/international";
import Login from "../components/pages/login";

// import 'styles/index.scss'; /* commented index.scss -GM */
const Routes = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <Route exact path = "/*" component={App}/>
      <Route exact path = "/home" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path = "/dashboard" component={Dashboard}/>
      <Route exact path = "/international" render={(props) => (<International region={"international"} formTitle={"REGISTRATION PROFORMA - INTERNATIONAL"} baseTheme={'#f18eb1'} {...props} />)}/>
      <Route exact path = "/national" render={(props) => (<International region={"national"}  formTitle={"REGISTRATION PROFORMA - NATIONAL"} baseTheme={"#12b3d8"} {...props} />)}/>
      <Route exact path = "/state" render={(props) => (<International region={"state"}  formTitle={"REGISTRATION PROFORMA - STATE"} baseTheme={"#9dca36"} {...props} />)}/>
    </div>
  </Router>
);

export default Routes;
