import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";

import UserList from "../UserList";

const renderUserList = props => render(<UserList {...props} />);

describe("<UserList />", () => {
  it("should show a list of users", () => {
    const props = {
      users: ["John", "Foo", "Doe"]
    };

    const { getByRole } = renderUserList(props);

    expect(getByRole("list").children.length).toEqual(3);
  });

  it("should show nothing", () => {
    const props = { users: [] };

    const { container } = renderUserList(props);

    expect(container.innerHTML).toEqual("");
  });
});
