import { render, screen } from "@testing-library/react";
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

import Register from './Register';

// Notes
// Always add an await keyword before triggering any event using userEvent as you may not know when the action will be completed.
// Always remember to remove the screen.debug statement once you're done with your assertions, and never keep it in your code.
// The getBy method throws an error if it does not find the matching element. So instead of using getBy we need to use queryBy

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole('heading', { level: 6 });
    expect(element).toBeInTheDocument();
  })

  it('Should error message when all the fields are not entered', async () => {
    render(<Register />);
    const buttonElement = screen.getByRole('button', { name: /register/i });
    await userEvent.click(buttonElement);
    const AlertElement = screen.getByRole('alert');
    expect(AlertElement).toBeInTheDocument();

    // DOM STRUCTURE
    // screen.debug()
  });
})

it('Sould not show any error message when the component is loaded', () => {
  render(<Register />);
  const AlertElement = screen.queryByRole('alert');
  expect(AlertElement).not.toBeInTheDocument();
});

it('Should show success message when the registration is successful', async () => {
  render(<Register />);
  const buttonElement = screen.getByRole('button', { name: /register/i });
  await userEvent.click(buttonElement);
  const AlertElement = screen.getByRole('alert');
  expect(AlertElement).toBeInTheDocument();
});

it('Should test for presence of subheading in the component', () => {
  render(<Register />);
  const element = screen.getByRole('heading', { name: /please enter your details below to register yourself\./i });
  expect(element).toBeInTheDocument();
});