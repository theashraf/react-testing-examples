import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import HiddenMessage from "../HiddenMessage";

describe("<HiddenMessage />", () => {
  it("shows the children when the checkbox is checked", () => {
    const testMessage = "Test Message";

    const { queryByText, getByLabelText, getByText } = render(
      <HiddenMessage>{testMessage}</HiddenMessage>
    );

    // query* functions will return the element or null if it cannot be found
    // get* functions will return the element or throw an error if it cannot be found

    expect(queryByText(testMessage)).toBeNull();

    fireEvent.click(getByLabelText(/show/i));

    expect(getByText(testMessage)).toBeInTheDocument();
  });
});
