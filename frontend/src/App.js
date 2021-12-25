import React, { Fragment } from "react";
import "./App.css";
import CreateFlight from "./pages/CreateFlight/CreateFlight.jsx";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import DisplayFlights from "./pages/DisplayFlights/DisplayFlights.jsx";
import Login from "./pages/Login/Login.jsx";
import EditFlight from "./pages/EditFlight/EditFlight.jsx";
import EditUserProfile from "./pages/EditUserProfile/EditUserProfile";
import DisplayReservations from "./pages/DisplayReservations/DisplayReservations";
import ChooseSeats from "./pages/ChooseSeats/ChooseSeats";
import ShowReservation from "./pages/ShowReservation/ShowReservation";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import FlightDetails from "./pages/FlightDetails/FlightDetails";
import ShowSummary from "./pages/ShowSummary/ShowSummary";
import SignUp from "./pages/Signup/Signup";
import { useAuthContext } from "./Context";
import NavBar from "./components/NavBar";
import ProtectedRouteUser from "./routes/ProtectedRouteUser";

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/signup" element={<SignUp />} />
          {/* <Route exact path="/home" element={<Home />} /> */}
          <Route exact path="/home" element={<ProtectedRouteUser />}>
            <Route
              path="/home"
              element={<Home />}
            />
          </Route>

          <Route exact path="/home/search" element={<Search />} />
          <Route
            exact
            path="/home/search/flightDetails"
            element={<FlightDetails />}
          />
          <Route exact path="/flights" element={<DisplayFlights />} />
          <Route
            exact
            path="/flights/create"
            element={<CreateFlight />}
          />
          <Route exact path="/flight/edit" element={<EditFlight />} />
          <Route exact path="/user/edit" element={<EditUserProfile />} />
          <Route
            exact
            path="/user/reservations"
            element={<DisplayReservations />}
          />
          <Route
            exact
            path="/user/showReservation/:id"
            element={<ShowReservation />}
          />
          <Route
            exact
            path="/user/chooseSeats"
            element={<ChooseSeats />}
          />
          <Route
            exact
            path="/reservation/summary"
            element={<ShowSummary />}
          />
          {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
