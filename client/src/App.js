import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels/:id" element={<Single/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
