import React, { useEffect, useState } from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";

import axios from "../../axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';

import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

import { useAppContext } from "../../Context";

export default function DisplayReservations() {
  const { createNotification } = useAppContext();

  const [reservations, setReservations] = useState(null);

  const [loading, setLoading] = useState(false);
  const hideLoading = () => {
    setLoading(false);
  };
  const showLoading = () => {
    setLoading(!loading);
  };

  const navigate = useNavigate();
  const getReservationsFromBE = () => {
    axios.get(`/user/reservations/dfs`)
      .then((response) => {

        setReservations(response.data);
        console.log(reservations);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const deletereservation = (id) => {
    axios.delete(`http://localhost:8000/user/reservation/${id}`).then(() => {
      console.log(id);
      window.location.reload(false);
    });
  };


  const emailItinerary = async (reservation) => {

    showLoading();
    var res = await axios.post(`/user/email-itinerary`, reservation);

    hideLoading();

    if (!res.data.status) {
      return createNotification(res.data.message, 'error');
    }

    return createNotification(res.data.message, 'success');
  };

  const showReservation = (reservation) => {
    var id = reservation._id;
    navigate(`/user/showReservation/${id}`);
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


    reservations == null ?
      <CircularProgress />
      :
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={hideLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <div style={{
          backgroundImage:
            "url(https://www.joomspirit.com/template-joomla/template-113/images/background/cloud-1.jpg)",
          backgroundRepeat: "repeat",
          height: '200vh'

        }}>


        <Container component="main" maxWidth="lg" >
          <br/>
          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell allign="left"> Departure Flight</TableCell>
                  <TableCell align="left">Return Flight</TableCell>
                  <TableCell align="left">Booking no.</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover = {true}
                  >
                    <TableCell align="left">
                      {reservation.departureFlightId}
                    </TableCell>
                    <TableCell align="left">{reservation.returnFlightId}</TableCell>
                    <TableCell align="left">{reservation._id}</TableCell>

                    <TableCell allign="left">
                      <Button variant="contained" color="primary" startIcon={<InfoIcon />} onClick={() => { showReservation(reservation) }}>Show Reservation</Button>
                      <br></br>
                      <br></br>

                      <Button variant="contained" color="warning" startIcon={<EmailIcon />}
                        onClick={() => { emailItinerary(reservation) }}>Email itinerary</Button>

                      <br></br>
                      <br></br>

                      <Button
                        variant="contained"
                        color="error"
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
                    <TableCell align="left">

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      </>

  );
}