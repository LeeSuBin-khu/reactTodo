import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './component/Detail';
import Home from './component/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
