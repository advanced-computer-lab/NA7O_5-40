
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'
export default function DisplayReservations(){
    const [reservations, setReservations] = useState([]);

    const getReservationsFromBE = () => {
        const id=1;
        Axios.get(`http://localhost:8000/user/reservations/:${id}`).then((response) => {
          console.log(response.data);
          setReservations(response.data);
        }).catch((e) => {
          console.log(e)
        })
      }
      useEffect(() => {
        getReservationsFromBE();
      }, []);


    const columns = [
    { field: 'userId', headerName: 'user ID', width: 100 },
    { field: 'departureFlightId', headerName: 'departure flight', width: 130 },
    { field: 'returnFlightId', headerName: 'return flight', width: 130 },
    {
    field: 'bookingNumber',
    headerName: 'booking no.',
    type: 'number',
    width: 130,
    },
    {
        field: 'chosenCabin',
        headerName: 'Cabin',
        width: 130,
        },
  {
    field: 'chosenSeatNumber',
    headerName: 'SeatNumber',
    width: 160,
   
  },
];

const rows = reservations;


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
      />
    </div>
  );
}
