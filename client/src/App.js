import { Route, Routes } from 'react-router-dom';
import './App.css';
import Next from './Components/Main/Next';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/next' element={<Next/>}/>
      </Routes>
    </div>
  );
}

export default App;
