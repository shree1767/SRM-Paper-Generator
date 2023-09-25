import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Landing from './Components/Main/Landing';

import Generator from './Components/Main/Generator';
import Upload from './Components/Main/Upload';

import GeneratedQP from './Components/GeneratedQP/GeneratedQP';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Landing/>}/>
        <Route path='/generator' element={<Generator/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/results' element={<GeneratedQP/>}/>
      </Routes>
    </div>
  );
}

export default App;
