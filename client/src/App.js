import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import GeneratedQP from './Components/GeneratedQP/GeneratedQP';
import Login from './Components/Auth/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/generator' element={<Main/>}/>
        <Route path='/results' element={<GeneratedQP/>}/>
      </Routes>
    </div>
  );
}

export default App;
