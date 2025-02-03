/* - 네트워크 통신이 성공하는 경우와 실패하는 경우 두 경우에 대해 검증
- 네트워크 통신이 성공하는 경우도 로그인에 성공하는 경우와 실패하는 경우 검증
    - 이를 위해 jest.fn().[mockImplementation()](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn) 이용할 것
- localStorage 에 토큰이 저장되는 것도 검증
    - 개별 테스트 종료시마다 로컬 스토리지 리셋 해줄것 */

import axios from "axios";
import Login from "./Login";
import { fireEvent, render, screen } from "@testing-library/react";

// axios mock에 대한 타입 정의
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeEach(() => {
  window.localStorage.removeItem("token");
});
describe("axios", () => {
  it("로그인에 성공", async () => {
    const fakeUserResponse = { token: "fake_user_token" };
    const response = { data: fakeUserResponse };
    mockedAxios.post.mockResolvedValue(response);
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "chuck" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "norris" },
    });
    fireEvent.click(screen.getByText(/submit/i));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/congrats/i);
    expect(window.localStorage.getItem("token")).toEqual(
      fakeUserResponse.token
    );
  });
  it("로그인에 실패", async () => {
    mockedAxios.post.mockImplementation((url: string, data?: unknown) => {
      const body = data as { username: string; password: string };
      if (body.username === "chuck" && body.password === "norris") {
        const fakeUserResponse = { token: "fake_user_token" };
        const response = { data: fakeUserResponse };
        return Promise.resolve(response);
      } else {
        return Promise.reject({ message: "Unauthorized", status: 401 });
      }
    });
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "invalid username" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "norris" },
    });
    fireEvent.click(screen.getByText(/submit/i));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/unauthorized/i);
    expect(window.localStorage.getItem("token")).toBeNull();
  });
});
