import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import { useLocation, useParams } from "react-router-dom";

export default function ShowReservation() {
  const search = useLocation().search;
  const id = useParams();
  const [depFlight, setDepFlight] = useState([]);
  const [returnFlight, setReturnFlight] = useState([]);
  const [reservation, setReservation] = useState(null);

  const getFlightsFromBE = () => {
    var name=id.id;
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
      Departure Flight
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell allign="left">Departure Date</TableCell>
              <TableCell allign="left">Departure Airport</TableCell>
              <TableCell allign="left">Arrival Date</TableCell>
              <TableCell allign="left">Arrival Airport</TableCell>
              <TableCell allign="left">Departure Cabin</TableCell>
              <TableCell allign="left">Departure Seat No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{depFlight.departureDate}</TableCell>
              <TableCell align="left">{depFlight.departureAirport}</TableCell>
              <TableCell align="left">{depFlight.arrivalDate}</TableCell>
              <TableCell align="left">{depFlight.arrivalAirport}</TableCell>
              <TableCell align="left">
                {reservation.chosenCabinDeparture}
              </TableCell>
              <TableCell align="left">
                {reservation.seatNumbersDeparture.map((seatNumber)=>(<li>{seatNumber}</li>))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      Return Flight
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell allign="left">Departure Date</TableCell>
              <TableCell allign="left">Departure Airport</TableCell>
              <TableCell allign="left">Arrival Date</TableCell>
              <TableCell allign="left">Arrival Airport</TableCell>
              <TableCell allign="left">Departure Cabin</TableCell>
              <TableCell allign="left">Departure Seat No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{returnFlight.departureDate}</TableCell>
              <TableCell align="left">
                {returnFlight.departureAirport}
              </TableCell>
              <TableCell align="left">{returnFlight.arrivalDate}</TableCell>
              <TableCell align="left">{returnFlight.arrivalAirport}</TableCell>
              <TableCell align="left">
                {reservation.chosenCabinDeparture}
              </TableCell>
              <TableCell align="left">
                {reservation.seatNumbersReturn.map((seatNumber)=>(<li>{seatNumber}</li>))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      price:{reservation.price}
    </div>
  );
}
