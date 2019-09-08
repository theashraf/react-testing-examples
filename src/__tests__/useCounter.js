import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import useCounter from "../useCounter";

/**
 * when not to use react-hooks-testing-library ?
 * 1- Your hook is defined along side a component and is only used there
 * 2- Your hook is easy to test by just testing the components using it
 *
 * when to use it ?
 * 1- You're writing a library with one or more custom hooks that are not directly tied a component
 * 2- You have a complex hook that is difficult to test through component interactions
 */

describe("useCounter hook", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  // testing a custom hook without the use of react-hooks-testing-library
  it("should increment counter : using MockComponent", () => {
    const FakeComponent = () => {
      const { count, increment } = useCounter();
      return (
        <div>
          <button data-testid="btn" onClick={() => increment()}>
            increment
          </button>
          <span data-testid="count">{count}</span>
        </div>
      );
    };

    const { getByTestId } = render(<FakeComponent />);

    expect(getByTestId("count")).toHaveTextContent(0);

    fireEvent.click(getByTestId("btn"));

    expect(getByTestId("count")).toHaveTextContent(1);
  });
});
