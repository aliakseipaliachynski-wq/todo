import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTodoForm } from "../ui/create-todo-form";

describe("CreateTodoForm", () => {
  it("should submit with trimmed title", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CreateTodoForm onSubmit={onSubmit} />);

    const input = screen.getByLabelText(/new todo title/i);
    const button = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "  Buy milk  ");
    await userEvent.click(button);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("Buy milk");
    });
  });

  it("should show error when title is empty", async () => {
    const onSubmit = jest.fn();
    render(<CreateTodoForm onSubmit={onSubmit} />);

    const button = screen.getByRole("button", { name: /add/i });
    await userEvent.click(button);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should disable submit when loading", () => {
    render(<CreateTodoForm onSubmit={jest.fn()} isLoading />);
    const button = screen.getByRole("button", { name: /add/i });
    expect(button).toBeDisabled();
  });
});
