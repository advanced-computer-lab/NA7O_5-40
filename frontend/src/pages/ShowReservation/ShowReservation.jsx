import React, { useEffect, useState,useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import Button from "@mui/material/Button";
import { UserContext } from "../../Context";
import CircularProgress from "@mui/material/CircularProgress";

import { useLocation, useParams,useNavigate, Link } from "react-router-dom";

export default function ShowReservation() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = useParams();
  const [depFlight, setDepFlight] = useState([]);
  const [returnFlight, setReturnFlight] = useState([]);
  const {reservation,setReservation,setFlightType,setCabinClass,cabinclass}= useContext(UserContext);

  const changeSeatsDeparture = (flight) => {
    var id = flight._id;
    setFlightType("departure");
    setCabinClass(reservation.chosenCabinDeparture); 
    navigate(`/user/changeSeats/${id}`);
  };
  const changeSeatsReturn = (flight) => {
    var id = flight._id;
    setFlightType("return");
    setCabinClass(reservation.chosenCabinReturn);
    navigate(`/user/changeSeats/${id}`);
  };
  const changeFlightDeparture = (flight) => {
    var id = flight._id;
    setFlightType("departure");  
    navigate(`/user/changeFlight/${id}`);
  };

  const changeFlightReturn = (flight) => {
    var id = flight._id;
    setFlightType("return");  
    navigate(`/user/changeFlight/${id}`);
  };

  const getFlightsFromBE = () => {
    var name = id.id;
    console.log(name);
    Axios.get(`http://localhost:8000/user/reservation/${name}`)
      .then((response) => {
        setReservation(response.data);
        console.log(reservation);

        Axios.get(
          `http://localhost:8000/user/flight/${response.data.departureFlightId}`
        )
          .then((response) => {
            setDepFlight(response.data);
          })
          .catch((e) => {
            console.log(e);
          });

        Axios.get(
          `http://localhost:8000/user/flight/${response.data.returnFlightId}`
        )
          .then((response) => {
            setReturnFlight(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlightsFromBE();
  }, []);

  return reservation == null ? (
    <CircularProgress />
  ) : (
    <div>
      <Link to="/user/reservations">Show all reservations</Link>

      <br />
      <br />


      Departure Flight
      < TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell allign="left">Flight No</TableCell>

              <TableCell allign="left">Departure Date</TableCell>
              <TableCell allign="left">Departure Airport</TableCell>
              <TableCell allign="left">Arrival Date</TableCell>
              <TableCell allign="left">Arrival Airport</TableCell>
              <TableCell allign="left">Departure Cabin</TableCell>
              <TableCell allign="left">Departure Seat No.</TableCell>
              <TableCell allign="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{depFlight.flightNo}</TableCell>

              <TableCell align="left">{depFlight.departureDate}</TableCell>
              <TableCell align="left">{depFlight.departureAirport}</TableCell>
              <TableCell align="left">{depFlight.arrivalDate}</TableCell>
              <TableCell align="left">{depFlight.arrivalAirport}</TableCell>
              <TableCell align="left">
                {reservation.chosenCabinDeparture}
              </TableCell>
              <TableCell align="left">
                {reservation.seatNumbersDeparture.map((seatNumber) => (<li>{seatNumber}</li>))}
              </TableCell>
              <TableCell align="left">
              <Button variant="outlined" onClick={() => {changeSeatsDeparture(depFlight)}}>Change Seats</Button>
              </TableCell>
              <TableCell align="left">
              <Button variant="outlined" onClick={() => {changeSeatsDeparture(depFlight)}}>Change Flight</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
      Return Flight
      < TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell allign="left">Flight No</TableCell>

              <TableCell allign="left">Departure Date</TableCell>
              <TableCell allign="left">Departure Airport</TableCell>
              <TableCell allign="left">Arrival Date</TableCell>
              <TableCell allign="left">Arrival Airport</TableCell>
              <TableCell allign="left">Departure Cabin</TableCell>
              <TableCell allign="left">Departure Seat No.</TableCell>
              <TableCell allign="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{returnFlight.flightNo}</TableCell>

              <TableCell align="left">{returnFlight.departureDate}</TableCell>
              <TableCell align="left">
                {returnFlight.departureAirport}
              </TableCell>
              <TableCell align="left">{returnFlight.arrivalDate}</TableCell>
              <TableCell align="left">{returnFlight.arrivalAirport}</TableCell>
              <TableCell align="left">
                {reservation.chosenCabinReturn}
              </TableCell>
              <TableCell align="left">
                {reservation.seatNumbersReturn.map((seatNumber) => (<li>{seatNumber}</li>))}
              </TableCell>
              <TableCell align="left">
              <Button variant="outlined" onClick={() => {changeSeatsReturn(returnFlight)}}>Change Seats</Button>
              </TableCell>
              <TableCell align="left">
              <Button variant="outlined" onClick={() => {changeSeatsDeparture(depFlight)}}>Change Flight</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
      price: {reservation.price}
    </div >
  );
}
