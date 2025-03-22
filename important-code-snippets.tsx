/* 

import React, { useState } from 'react';

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    name: '',
    rememberMe: false,
    status: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = e.target;
    setLoginInfo(oldValue => ({
      ...oldValue,
      [name]: type == 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(loginInfo);
  }

  return (
    <form onSubmit={handleSubmit}>
      username
      <input
        type="text"
        name="name"
        value={loginInfo.name}
        onChange={handleChange}
      />
      <br />
      <br />
      email
      <input
        type="email"
        name="email"
        value={loginInfo.email}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type="checkbox"
        name="rememberMe"
        id="checkbox"
        checked={loginInfo.rememberMe}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Remember me</label>
      <br />
      <br />
      <input
        type="radio"
        name="status"
        id="married"
        value={'married'}
        onChange={handleChange}
        checked={loginInfo.status == 'married'}
      />
      <label htmlFor="married"> Married</label>
      <input
        type="radio"
        name="status"
        id="single"
        value={'single'}
        onChange={handleChange}
        checked={loginInfo.status == 'single'}
      />
      <label htmlFor="single"> Single</label>
      <br />
      <br />
      <button>Log in</button>
    </form>
  );
};


*/
