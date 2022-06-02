import './App.css';
import {BrowserRouter as Router, Link, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Location from './pages/Location';

function App() {
  return (
    <div className="NavBar">
        <Router>
          <nav>
            <Link to="/">Home</Link> | { }
            <Link to="/location">Add Location</Link>
          </nav>      
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/location" element={<Location />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
