import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import {Signup} from './components/Signup'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Invoice from './components/Invoice';
import Preview from './components/Preview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/setting" element={<Settings/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/preview" element={<Preview/>}></Route>
        
         
        
       
        
        
         
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
