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
import style from './ChooseSeats.module.css';

export default function ChoosenSeats() {
  const navigate = useNavigate();
  const location = useLocation();

  const { chosenReturnFlight, chosenDepartureFlight,
    searchCriteria, chosenSeatsDeparture, chosenSeatsReturn,
    setChosenSeatsDeparture,
    setChosenSeatsReturn
  } = useContext(UserContext)


  const [freeSeatsDeparture, setFreeSeatsDeparture] = useState([]);
  const [freeSeatsReturn, setFreeSeatsReturn] = useState([]);

  const [requiredSeats, setRequiredSeats] = useState(0);

  const [noChosenDeparture, setNoChosenDeparture] = useState(0);
  const [noChosenReturn, setNoChosenReturn] = useState(0);


  function getFreeCabinSeats(freeSeats, chosenCabin) {
    if (chosenCabin == 'economy')
      return freeSeats.filter((seat) => seat.startsWith('E'));
    else
      return freeSeats.filter((seat) => seat.startsWith('B'));

  }

  function getFreeCabinSeats(freeSeats, chosenCabin) {
    if (chosenCabin == 'economy')
      return freeSeats.filter((seat) => seat.startsWith('E'));
    else
      return freeSeats.filter((seat) => seat.startsWith('B'));
  }



  useEffect(() => {
    //get seats from departure flights
    //axios.get().....

    if (searchCriteria == null)
      return navigate('/home')

    console.log(searchCriteria);
    var cabinClass = searchCriteria.cabinClass;

    setRequiredSeats(parseInt(searchCriteria.children) + parseInt(searchCriteria.adults));

    setFreeSeatsDeparture(getFreeCabinSeats(chosenDepartureFlight.freeSeats, cabinClass))
    setFreeSeatsReturn(getFreeCabinSeats(chosenReturnFlight.freeSeats, cabinClass))

  }, []);



  return (

    searchCriteria &&
    <div className={`${style.backgroundimg}`}>
      <div className={`${style.back}`}>
        <Box sx={{ flexGrow: 5 }} style={{ padding: '20px 50px' }}
        >
          <Button
            style={{ marginRight: "20px" ,color:"white"}}
            variant="outlined"
            onClick={() => {

              navigate('/home/search')
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              if (noChosenDeparture != requiredSeats || noChosenReturn != requiredSeats)
                alert('Chosen seats do not match your required no of seats')
              else {
                navigate('/reservation/summary')
              }
            }}
          >
            Confirm
          </Button>
          <br />
          <br />

          <Grid container spacing={10}>

            <Grid item xs={4}>
              <h1
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  fontSize: "1.5rem",
                  color:"white",
                }}
              >
                Departure Flight: {chosenDepartureFlight.flightNo}
              </h1>
              <br />
              <h2
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  fontSize: "1.5rem",
                  color:"white",
                }}
              >
                Chosen Cabin: {searchCriteria.cabinClass}
              </h2>
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Choose your Seat(s) </TableCell>
                      <TableCell>{noChosenDeparture}/{requiredSeats}</TableCell>
                    </TableRow>
                  </TableHead>
                  {freeSeatsDeparture.map((row) => (
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
                              var x = chosenSeatsDeparture
                              x.push(e.target.value)

                              setChosenSeatsDeparture(x);
                              setNoChosenDeparture(noChosenDeparture + 1)
                            }
                            else {
                              setChosenSeatsDeparture(chosenSeatsDeparture.filter(element => element != e.target.value))
                              setNoChosenDeparture(noChosenDeparture - 1)

                            }

                            console.log(chosenSeatsDeparture);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
              <br />

            </Grid>
            <Grid item xs={4}>
              <h1
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  fontSize: "1.5rem",
                  color:"white",
                }}
              >
                Return Flight: {chosenReturnFlight.flightNo}
              </h1>
              <br />
              <h2
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "left",
                  justifyContent: "left",
                  fontSize: "1.5rem",
                  color:"white",
                }}
              >
                Chosen Cabin: {searchCriteria.cabinClass}
              </h2>
              <br />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Choose your Seat(s)</TableCell>
                      <TableCell>{noChosenReturn}/{requiredSeats}</TableCell>
                    </TableRow>
                  </TableHead>
                  {freeSeatsReturn.map((row) => (
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
                              var x = chosenSeatsReturn
                              x.push(e.target.value)

                              setChosenSeatsReturn(x);
                              setNoChosenReturn(noChosenReturn + 1)
                            }
                            else {
                              setNoChosenReturn(noChosenReturn - 1)

                              setChosenSeatsReturn(chosenSeatsReturn.filter(element => element != e.target.value))
                            }

                            console.log(chosenSeatsReturn);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
              <br />

            </Grid>

          </Grid>
        </Box>
      </div>
    </div>
  );
}