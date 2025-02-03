import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import App from "./_app";
import { Router } from "next/router";

// useRouter를 mock 처리
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const MockComponent = () => <div>Hello, World!</div>;

describe("_app.tsx", () => {
  it("renders the component passed to App", () => {
    // useRouter mock 설정 (router 객체를 전달)
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      query: {},
      asPath: "/",
      route: "/",
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      basePath: "", // 기본값 설정
      components: {}, // 필요한 컴포넌트들 추가
      sdc: {}, // 서버 데이터 캐시
      sbc: {}, // 서버 상태 캐시
      isFallback: false, // 기본값 설정
      // 다른 필요한 속성들도 추가
    });

    const pageProps = { someProp: "value" };
    
    // router 객체를 mock으로 전달
    const routerMock: Partial<Router> = {
      pathname: "/",
      query: {},
      asPath: "/",
      route: "/",
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      basePath: "",
      components: {},
      sdc: {},
      sbc: {},
      isFallback: false,
    };

    render(<App Component={MockComponent} pageProps={pageProps} router={routerMock as Router} />);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
