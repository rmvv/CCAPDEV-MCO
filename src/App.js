// import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import EditReserve from './pages/EditReserve';
import Reserve from './pages/Reserve';
import AdminReserve from './pages/AdminReserve.js';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './components/UserContext'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/reservation/:id",
    element: <EditReserve />, 
  },
  {
    path: "/EditProfile/:id",
    element: <EditProfile />, 
  },
  {
    path: "/reserve",
    element: <Reserve />
  },
  {
    path: "/adminReserve",
    element: <AdminReserve />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]); 

function App() {
  return (
    <UserProvider>
      <SnackbarProvider maxSnack={5}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
