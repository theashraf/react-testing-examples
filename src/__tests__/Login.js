import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Login from "../Login";

describe("<Login />", () => {
  it("should allow user to login", async () => {
    const fakeResponse = { token: "fake_token" };

    jest.spyOn(window, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
      })
    );

    const { getByLabelText, getByText, findByRole } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "admin" }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "admin" }
    });

    fireEvent.click(getByText(/submit/i));

    const alert = await findByRole("alert");

    expect(alert).toHaveTextContent(/congrats/i);

    expect(window.localStorage.getItem("token")).toEqual(fakeResponse.token);
  });
});
