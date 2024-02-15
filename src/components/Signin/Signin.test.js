import { render, screen, fireEvent } from "@testing-library/react";
import Signin from "./Signin";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: "123", password: "abc" }),
  }),
);

test("renders Signin component", () => {
  render(<Signin />);
  const signinElement = screen.getByRole("group", /Sign In/i);
  expect(signinElement).toBeInTheDocument();
});

test("updates email state on input change", () => {
  render(<Signin />);
  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("updates password state on input change", () => {
  render(<Signin />);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  expect(passwordInput.value).toBe("password123");
});
