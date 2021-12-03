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
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { UserContext } from "../../Context";

export default function ChoosenSeats() {
  const navigate = useNavigate();
  const location = useLocation();

  const { chosenReturnFlight, chosenDepartureFlight, searchCriteria } = useContext(UserContext)

  const [choosenSeat, setChoosenSet] = useState([]);

  function getCabinSeats() {}

  useEffect(() => {
    //get seats from departure flights
    //axios.get().....
    let choosenSeat = ["1A", "1B", "2D", "4E"];
    console.log("departure flight seats : " + choosenSeat);

    var cabinClass= searchCriteria.cabinClass;
    console.log(cabinClass)
    setChoosenSet( chosenDepartureFlight.freeSeats);
  }, []);

  //seatsselected is the array which we put in the selected seats of the departure flight
  let seatsselected = [];
  const selectShortlistedApplicant = (e, row) => {
    const checked = e.target.checked;
    if (checked) {
      //console.log("row: " + row);
      seatsselected.push(row);
      console.log("seatsselected for departure flights: " + seatsselected);
    }
  };
  //removechoosenseats is a method which removes the seats selected
  const removechoosenseats = () => {
    seatsselected.map(function (val, index) {
      //remove every seat selected
      //axios.delete()...
      choosenSeat.splice(choosenSeat.indexOf(val), 1);
    });
    console.log("seats for departure flights after removing:" + choosenSeat);
    //window.location.reload(false);
  };

  const [choosenSeat1, setChoosenSet1] = useState([]);
  useEffect(() => {
    //get seats from return flights
    //axios.get().....
    let choosenSeat1 = ["2A", "2B", "3D", "3E"];
    console.log("return flight seats : " + choosenSeat1);
    setChoosenSet1(choosenSeat1);
  }, []);
  //seatsselected2 is the array which we put in the selected seats of the return flight
  let seatsselected2 = [];
  const selectShortlistedApplicant2 = (e, row) => {
    const checked = e.target.checked;
    if (checked) {
      seatsselected2.push(row);
      console.log("seatsselected2 for return flights: " + seatsselected2);
    }
  };
  //removechoosenseats is a method which removes the seats selected from return flights
  const removechoosenseats2 = () => {
    seatsselected2.map(function (val, index) {
      //remove every seat selected
      //axios.delete()...
      choosenSeat1.splice(choosenSeat1.indexOf(val), 1);
    });
    console.log("seats for return flights after removing:" + choosenSeat1);
    //window.location.reload(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <h1
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "left",
              fontSize: "1.5rem",
            }}
          >
            Departure Flight:
          </h1>
          <br />
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "left",
              fontSize: "1.5rem",
            }}
          >
            Chosen Cabin:
          </h2>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Choose your Seat(s)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {choosenSeat.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        selectShortlistedApplicant(e, row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              removechoosenseats();
            }}
          >
            Confirm
          </Button>
        </Grid>
        <Grid item xs={5}>
          <h1
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "left",
              fontSize: "1.5rem",
            }}
          >
            Return Flight:
          </h1>
          <br />
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "left",
              fontSize: "1.5rem",
            }}
          >
            Chosen Cabin:
          </h2>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Choose your Seat(s)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {choosenSeat1.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        selectShortlistedApplicant2(e, row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              removechoosenseats2();
            }}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}