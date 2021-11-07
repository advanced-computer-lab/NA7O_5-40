import logo from './logo.svg';
import './App.css';
import CreateFlight from './pages/CreateFlight';
import { Route, Routes } from 'react-router-dom'
import DisplayFlights from './pages/DisplayFlights';
import Login from './pages/Login';
import EditFlight from './pages/EditFlight';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/flights" element={<DisplayFlights />} />
        <Route path="/flights/create" element={<CreateFlight />} />
        <Route path="/flight/edit" element={<EditFlight />} />

      </Routes>
    </div>
  );
}

export default App;
