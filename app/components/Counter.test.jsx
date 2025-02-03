//체크박스를 체크했을 때 document.title이 잘 변경되고,
//해제했을 때 다시 기본값으로 돌아오는 것도 검증할 것
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
test("체크박스를 체크했을 때 document.title이 잘 변경", () => {
  render(<Counter />);
  const originTitle = document.title
  const incrementButton = screen.getByText("Increment");
  const checkbox = screen.getByRole("checkbox");
  const count = screen.getByTestId("count");
  fireEvent.click(checkbox);
  expect(count).toHaveTextContent("Clicked 0 time");
  expect(document.title).toBe("Total number of clicks: 0");
  fireEvent.click(incrementButton)
  expect(count).toHaveTextContent("Clicked 1 time");
  expect(document.title).toBe("Total number of clicks: 1");
  fireEvent.click(incrementButton)
  expect(count).toHaveTextContent("Clicked 2 times");
  expect(document.title).toBe("Total number of clicks: 2");
  fireEvent.click(checkbox);
  expect(document.title).toBe(originTitle);
});
