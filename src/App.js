// import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Slot from './pages/Slot';
import Reserve from './pages/Reserve';
import Register from './pages/Register';
import Profile from './pages/Profile';

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
    path: "/slot/:roomId",
    element: <Slot />,
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
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
