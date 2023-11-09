import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotels from "./pages/hotels/Hotels";
import Single from "./pages/single/Single";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotels/:id" element={<Single/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
