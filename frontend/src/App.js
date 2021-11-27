import logo from './logo.svg';
import './App.css';
import CreateFlight from './pages/CreateFlight/CreateFlight.jsx';
import { Route, Routes } from 'react-router-dom'
import DisplayFlights from './pages/DisplayFlights/DisplayFlights.jsx';
import Login from './pages/Login/Login.jsx';
import EditFlight from './pages/EditFlight/EditFlight.jsx';
import EditUserProfile from './pages/EditUserProfile/EditUserProfile';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/flights" element={<DisplayFlights />} />
        <Route path="/flights/create" element={<CreateFlight />} />
        <Route path="/flight/edit" element={<EditFlight />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/user/edit" element={<EditUserProfile/>} />

      </Routes>
    </div>
  );
}

export default App;
