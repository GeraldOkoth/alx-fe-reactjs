import React, {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="*" element={<h2>404 Not Found</h2>} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
