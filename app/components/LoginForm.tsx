import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 여기에 로그인 로직을 구현합니다.
    // 예시로 사용자명과 비밀번호가 'testuser'와 'password123'인 경우 로그인 성공으로 처리합니다.
    if (username === 'testuser' && password === 'password123') {
      setMessage('로그인 성공!');
    } else {
      setMessage('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자명</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="사용자명"
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="비밀번호"
          />
        </div>

        <button type="submit">로그인</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
