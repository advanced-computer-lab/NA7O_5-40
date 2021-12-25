import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { UserContext } from "../../Context";
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChangeSeats() {
    const navigate = useNavigate();
    const id = useParams();
    const [seats, setSeats] = useState([]);
    const [chosenSeats, setChosenSeats] = useState([]);
    const [noChosenSeats, setNoChosenSeats] = useState(0);
    const [requiredSeats, setRequiredSeats] = useState(0);
    const { reservation, setReservation,flightType,setFlightType,cabinClass } = useContext(UserContext);
    

    const getSeatsFromBE = () => {
        
        if(flightType=="departure"){
            console.log("hi");
        setRequiredSeats(reservation.seatNumbersDeparture.length);
            
    }
        else{
            setRequiredSeats(reservation.seatNumbersReturn.length);
        }
        var name = id.id;
        var body={cabin:cabinClass};
        console.log(body);
        Axios.post(
            `http://localhost:8000/user/availableSeats/${name}`,body
        )
            .then((response) => {
                setSeats(response.data.availableSeats);

            })
            .catch((e) => {
                console.log(e);
            });
    }

    const changeSeatsInBE = () => {
        if(flightType=="departure")
        var body={_id:reservation._id,newSeats:chosenSeats,selectedFlight:"departure"};
        else{
            var body={_id:reservation._id,newSeats:chosenSeats,selectedFlight:"return"}; 
        }
        Axios.post(
            "http://localhost:8000/user/changeSeats",body
        )
            .then((response) => {
                window.alert("seats changed");
                navigate("/user/reservations");

            })
            .catch((e) => {
                console.log(e);
            });
    }



    useEffect(() => {
        getSeatsFromBE();
        console.log(seats);
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
            changeSeatsInBE()
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
            {seats.map((row) => (
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