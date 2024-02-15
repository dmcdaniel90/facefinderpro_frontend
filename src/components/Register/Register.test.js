import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";

test("renders Register component", () => {
  render(<Register />);
  const registerElement = screen.getByRole("group", /Register/i);
  expect(registerElement).toBeInTheDocument();
});

test("updates name state on input change", () => {
  render(<Register />);
  const nameInput = screen.getByLabelText(/Name/i);
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  expect(nameInput.value).toBe("John Doe");
});

test("updates email state on input change", () => {
  render(<Register />);
  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("updates password state on input change", () => {
  render(<Register />);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  expect(passwordInput.value).toBe("password123");
});
