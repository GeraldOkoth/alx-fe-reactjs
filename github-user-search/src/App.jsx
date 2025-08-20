import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './components/Search';
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
          <div>
            {/* <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes> */}
            <Search />
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;
