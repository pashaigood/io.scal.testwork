import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

test("render the app", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // expect(getByText(/learn/i)).toBeInTheDocument();
});
