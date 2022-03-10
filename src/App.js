import './App.css';

// Components
import Welcome from './components/Welcome';
import Header from './components/Header';
import Log from './components/Log';
import EmptyPage from './components/EmptyPage';

// React Router DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/log" element={<Log />}/>
          <Route path="*" element={<EmptyPage/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
