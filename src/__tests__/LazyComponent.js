import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, waitForElement } from "@testing-library/react";

const LazyComponent = React.lazy(() => import("../LazyComponent"));

test("should render lazily", async () => {
  const { getByText } = render(
    <React.Suspense fallback="test loading">
      <LazyComponent />
    </React.Suspense>
  );

  const lazyElement = await waitForElement(() => getByText(/load me lazy/i));

  expect(lazyElement).toBeInTheDocument();
});
