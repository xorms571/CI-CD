import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('로그인 폼이 올바르게 작동해야 함', async () => {
  render(<LoginForm />);

  // 입력 필드 찾기
  const usernameInput = screen.getByLabelText('사용자명');
  const passwordInput = screen.getByLabelText('비밀번호');
  const submitButton = screen.getByRole('button', { name: '로그인' });

  // 사용자 입력 시뮬레이션
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // 폼 제출
  fireEvent.click(submitButton);

  // 결과 확인
  await waitFor(() => {
    // '로그인 성공!' 텍스트가 화면에 있는지 확인
    expect(screen.getByText('로그인 성공!')).toBeInTheDocument();
  });
});
