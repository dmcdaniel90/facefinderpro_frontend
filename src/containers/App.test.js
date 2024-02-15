import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const linkElement = screen.getByRole("group", { name: /Sign in/i });
  expect(linkElement).toBeInTheDocument();
});
