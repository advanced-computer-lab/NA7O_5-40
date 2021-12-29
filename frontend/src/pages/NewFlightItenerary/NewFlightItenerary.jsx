import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";

export default function NewFlightItenerary() {
    const navigate = useNavigate();
    const {newFlight,setNewFlight,newCabinClass,setNewCabinClass}=useContext(UserContext);

    function getTripDuration(departureDate,arrivalDate) {    
        var depDate=new Date(departureDate);
        var arrivDate=new Date(arrivalDate);
        var timeDiff=Math.abs(depDate - arrivDate) / 36e5;
        return timeDiff;
    }


    return(<div>
        <TableContainer component={Paper}>
      <Link to="/home">Home</Link>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell allign="left"> Flight Number</TableCell>
            <TableCell align="left">Departure Time</TableCell>
            <TableCell align="left">Arrival Time</TableCell>
            <TableCell align="left">Trip Duration</TableCell>
            <TableCell align="left">Cabin Class</TableCell>
            <TableCell align="left">Baggage Allowance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{newFlight.flightDetails.flightNo}</TableCell>
              <TableCell align="left">{newFlight.flightDetails.departureDate}</TableCell>
              <TableCell align="left">{newFlight.flightDetails.arrivalDate}</TableCell>
              <TableCell align="left">{`${getTripDuration(newFlight.flightDetails.departureDate,newFlight.flightDetails.arrivalDate)}H`}</TableCell>
              <TableCell align="left">{newCabinClass}</TableCell>
              <TableCell align="left">{newFlight.flightDetails.baggageAllowance}</TableCell>
              
              
             
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="outlined" onClick={() => { navigate("/user/chooseNewSeats")}}>Select Seats</Button>
    </div>
  );
}
