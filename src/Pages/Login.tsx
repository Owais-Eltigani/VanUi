import {
  useSearchParams,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { loginUser } from '../utils/APIs';

export const action = async ({ request }) => {
  // read the form data from the request
  const formData = await request.formData();
  const password = formData.get('password');
  const email = formData.get('email');

  // get the URL object
  const url = new URL(request.url);

  // get the value of the url parameter which the user tried to access.
  const redirectTo = url.searchParams.get('url');

  try {
    const user = await loginUser({ email, password });

    // store the user in the local storage
    localStorage.setItem('user', JSON.stringify(user));

    // redirect the user to the page they tried to access
    return redirectTo ? redirect(redirectTo) : redirect('/host');
  } catch (error: unknown) {
    localStorage.removeItem('user');
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unexpected error occurred.';
    }
  }
};

export function Login() {
  const navigation = useNavigation();
  const [message, setMessage] = useSearchParams();

  const err: Error | unknown = useActionData();
  const label = message.get('message');

  const showMessage = (
    <div className="mb-4 p-3 bg-red-500/70 w-[500px] text-white">{label}</div>
  );

  return (
    <div className="login-container">
      <h1 className="text-4xl pb-6">Sign in to your account</h1>
      {label && showMessage}
      <p className="pb-6">{err && err}</p>
      <Form className="login-form" method="post" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          disabled={navigation.state == 'submitting'}
          className={`${
            navigation.state === 'submitting' ? 'bg-gray-400' : 'bg-blue-500'
          }}`}>
          {navigation.state == 'submitting' ? 'Loading...' : 'Sign in'}
        </button>
      </Form>
    </div>
  );
}
