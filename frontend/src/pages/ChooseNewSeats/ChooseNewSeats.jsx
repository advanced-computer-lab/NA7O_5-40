import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
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
import Axios from "../../axios";
import CircularProgress from "@mui/material/CircularProgress";


export default function ChooseNewSeats() {
    const { reservation, setReservation, cabinClass, setCabinClass } = useContext(UserContext);
    const { flightType, setNewFlightType, newFlight, setNewFlight } = useContext(UserContext);
    const [requiredSeats, setRequiredSeats] = useState(0);
    const [chosenSeats, setChosenSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [noChosenSeats, setNoChosenSeats] = useState(0);
    const navigate = useNavigate();

    async function getSeats() {
        try {
            var temp = await Axios.post(`http://localhost:8000/user/availableSeats/${newFlight.flightDetails._id}`, { cabin: cabinClass });
            console.log(temp);
            setAvailableSeats(temp.data.availableSeats);
        }
        catch (err) {
            console.log(err);
        }
        if (flightType == "departure") {
            console.log("hi");
            setRequiredSeats(reservation.seatNumbersDeparture.length);
        }
        else {
            setRequiredSeats(reservation.seatNumbersReturn.length);
        }
    }

    async function changeFlight() {
        var body = { reservationId: reservation._id, newFlightId: newFlight.flightDetails._id, newSeats: chosenSeats, flightType: flightType, chosenCabin: cabinClass };


        var req = await axios.post('/user/checkout', {
            amount: newFlight.priceDifference
        });

        await Axios.post("http://localhost:8000/user/changeFlight", body);
        // alert('Flight has been changed Successfully!');
        // navigate("/user/reservations");

        window.location.href = req.data.url;

    }



    useEffect(() => {
        getSeats();
    }, []);





    return requiredSeats == [] ? (
        <CircularProgress />
    ) : (<div>
        <Button
            variant="contained"
            onClick={() => {
                if (noChosenSeats != requiredSeats)
                    alert('Chosen seats do not match your required no of seats')
                else {
                    changeFlight()
                }
            }}
        >
            Confirm
        </Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Choose your Seat(s) </TableCell>
                        <TableCell>{noChosenSeats}/{requiredSeats}</TableCell>
                    </TableRow>
                </TableHead>
                {availableSeats.map((row) => (
                    <TableRow
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell align="left">{row}</TableCell>
                        <TableCell>
                            <input
                                type="checkbox"
                                value={row}
                                onChange={(e) => {


                                    if (e.target.checked) {
                                        var x = chosenSeats
                                        x.push(e.target.value)

                                        setChosenSeats(x);
                                        setNoChosenSeats(noChosenSeats + 1)
                                    }
                                    else {
                                        setChosenSeats(chosenSeats.filter(element => element != e.target.value))
                                        setNoChosenSeats(noChosenSeats - 1)

                                    }

                                    console.log(chosenSeats);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        </TableContainer>
    </div>
    )




}