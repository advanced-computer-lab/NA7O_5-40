import logo from './logo.svg';
import './App.css';
import CreateFlight from './pages/CreateFlight/CreateFlight.jsx';
import { Route, Routes } from 'react-router-dom'
import DisplayFlights from './pages/DisplayFlights/DisplayFlights.jsx';
import Login from './pages/Login/Login.jsx';
import EditFlight from './pages/EditFlight/EditFlight.jsx';
import EditUserProfile from './pages/EditUserProfile/EditUserProfile';
import DisplayReservations from './pages/DisplayReservations/DisplayReservations';
import ChooseSeats from './pages/ChooseSeats/ChooseSeats';
import ShowReservation from './pages/ShowReservation/ShowReservation';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import FlightDetails from './pages/FlightDetails/FlightDetails';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/search" element={<Search />} />
        <Route path="/home/search/flightDetails" element={<FlightDetails />} />
        <Route path="/flights" element={<DisplayFlights />} />
        <Route path="/flights/create" element={<CreateFlight />} />
        <Route path="/flight/edit" element={<EditFlight />} />
        <Route path="/user/edit" element={<EditUserProfile/>} />
        <Route path="/user/reservations" element={<DisplayReservations/>} />
        <Route path="/user/showReservation/:id" element={<ShowReservation/>} />
        <Route path="/user/chooseSeats" element={<ChooseSeats/>} />
      </Routes>
    </div>
  );
}

export default App;
