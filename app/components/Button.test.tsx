import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    
    // 버튼의 텍스트가 올바르게 렌더링되는지 확인
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("triggers the onClick function when clicked", () => {
    const handleClick = jest.fn(); // 클릭 이벤트를 모킹
    render(<Button label="Click Me" onClick={handleClick} />);

    // 버튼을 찾아 클릭 이벤트를 실행
    const buttonElement = screen.getByTestId("custom-button");
    fireEvent.click(buttonElement);

    // 클릭 이벤트가 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
