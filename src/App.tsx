import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Vans, loader as vanLoader } from './Pages/Vans';
import {
  Van as VanDetails,
  loader as VanDetailsLoader,
} from './Pages/VanDetails';
import './server';
import { Layout } from './components/Layout';
import { Host } from './components/Host';
import { Income, loader as incomeLoader } from './components/Income';
import { Review } from './components/Review';
import { DashBoard } from './components/DashBoard';
import { VansList, loader as hostVanSLoader } from './components/VansList';
import { VanByID } from './components/VanByID';
import { Pricing } from './components/Pricing';
import { Photos } from './components/Photos';
import {
  HostVanDetailsLayout as VanLayout,
  loader as hostVanLoader,
} from './components/HostVanDetailsLayout';
import { NotFound } from './components/NotFound';
import { Login } from './Pages/Login';
import { auth } from './utils/auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<NotFound />} />

      <Route path="About" element={<About />} />

      <Route path="login" element={<Login />} />

      <Route
        path="vans"
        element={<Vans />}
        loader={vanLoader}
        errorElement={<h1>Something went wrong</h1>}
      />

      <Route
        path="/vans/:id"
        element={<VanDetails />}
        loader={VanDetailsLoader}
      />

      <Route path="host" element={<Host />}>
        <Route index element={<DashBoard />} />

        <Route path="income" element={<Income />} loader={auth} />

        <Route
          path="Reviews"
          element={<Review />}
          loader={async () => {
            const loggedIn = true;
            if (loggedIn) return redirect('/login');
            return null;
          }}
        />

        <Route path="VansList" element={<VansList />} loader={hostVanSLoader} />

        <Route
          path="vansList/:id"
          element={<VanLayout />}
          loader={hostVanLoader}>
          <Route
            index
            element={<VanByID />}
            loader={async () => {
              const loggedIn = true;
              if (!loggedIn) throw redirect('/login');
              return null;
            }}
          />

          <Route
            path="pricing"
            element={<Pricing />}
            loader={async () => {
              const loggedIn = true;
              if (!loggedIn) throw redirect('/login');
              return null;
            }}
          />

          <Route
            path="photos"
            element={<Photos />}
            loader={async () => {
              const loggedIn = true;
              if (!loggedIn) throw redirect('/login');
              return null;
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
