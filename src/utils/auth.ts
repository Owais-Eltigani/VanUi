import { redirect } from 'react-router-dom';

export const auth = async (url = '') => {
  const Lc = localStorage.getItem('user');
  const user = Lc ? JSON.parse(Lc) : null;

  if (user === null)
    throw redirect(`/login?message=You must Log in&url=${url}`);
};
