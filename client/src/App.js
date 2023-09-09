import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import GeneratedQP from './Components/GeneratedQP/GeneratedQP';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/generated' element={<GeneratedQP/>}/>
      </Routes>
    </div>
  );
}

export default App;
