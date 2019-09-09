import React from "react";
import { Switch, Route } from "react-router-dom";

const HomePage = () => <div>You are home </div>;
const AboutPage = () => <div>you are on the about page</div>;
const NotFound = () => <div>No match</div>;

const Routes = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
