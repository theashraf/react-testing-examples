import React from "react";
import { withRouter } from "react-router";
import { Link, MemoryRouter as Router, Switch } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

import Routes from "../Routes";

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

const App = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Switch>
      <Routes />
    </Switch>
    <LocationDisplay />
  </div>
);

// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
const renderWithRouter = (ui, route = "/") =>
  render(<Router initialEntries={[route]}>{ui}</Router>);

test("full app rendering/navigating", () => {
  const { container, getByText } = renderWithRouter(<App />);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch(/you are home/i);
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/about/i), leftClick);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch(/you are on the about page/i);
});

test("landing on a bad page", () => {
  const { container } = renderWithRouter(<App />, "/bad-route");
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch(/No match/i);
});

test("rendering a component that uses withRouter", () => {
  const route = "/some-route";
  const { getByTestId } = renderWithRouter(<LocationDisplay />, route);
  expect(getByTestId("location-display").textContent).toBe(route);
});
