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
import Register from './pages/Register';
import Profile from './pages/Profile';
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
    path: "/reserve",
    element: <Reserve />
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
