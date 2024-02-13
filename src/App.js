import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Avail from './pages/Avail';
import Reserve from './pages/Reserve';


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
    path: "/avail/:roomId",
    element: <Avail />,
  },
  {
    path: "/reserve",
    element: <Reserve />
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
