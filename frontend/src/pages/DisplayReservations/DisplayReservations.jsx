import React, { useEffect, useState } from "react";
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
export default function DisplayReservations() {
  const [reservations, setReservations] = useState([]);

  const getReservationsFromBE = () => {
    const id = "61a28ba03853507d6e8e2f46";
    Axios.get(`http://localhost:8000/user/reservations/${id}`)
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deletereservation = (id) => {
    axios.delete(`http://localhost:8000/user/reservations/${id}`).then(() => {
      console.log(id);
      window.location.reload(false);
    });
  };
  useEffect(() => {
    getReservationsFromBE();
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell allign="left"> Departure Flight</TableCell>
            <TableCell align="left">Return Flight</TableCell>
            <TableCell align="left">Booking no.</TableCell>
            <TableCell align="left">Cabin no.</TableCell>
            <TableCell align="left">Seat no.</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {reservation.departureFlightId}
              </TableCell>
              <TableCell align="left">{reservation.returnFlightId}</TableCell>
              <TableCell align="left">{reservation.bookingNumber}</TableCell>
              <TableCell align="left">{reservation.chosenCabin}</TableCell>
              <TableCell align="left">{reservation.chosenSeatNumber}</TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleClickOpen}
                >
                  cancel reservation
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>Decline</Button>
                    <Button
                      onClick={() => {
                        deletereservation(reservation._id);
                        handleClose();
                      }}
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
