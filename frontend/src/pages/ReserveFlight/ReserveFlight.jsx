import React, { useEffect, useState, useContext } from "react";

import axios from '../../axios'
import { UserContext, useAuthContext, useAppContext } from "../../Context";

import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function ReserveFlight() {
  const { isLoggedIn } = useAuthContext();
  const { createNotification } = useAppContext();

  const navigate = useNavigate();

  const reserve = async () => {
    
    if (!localStorage.getItem('reservation')) {
      return navigate('/user/reservations');
    }

    // get reservation info from localstorage and parse it to json
    var reservation = JSON.parse(localStorage.getItem('reservation'))


    // send post request to add reservation to DB using this info
    await axios.post('/user/reservation/create', reservation);


    // success alert
    createNotification('Reservation created!', 'success');

    // remove this info, no longer needed
    localStorage.removeItem('reservation');

    // navigate to list of user reservations
    return navigate('/user/reservations');


  }

  useEffect(() => {
    reserve();
  }, []);

  return (
    <p>
      Creating reservation....
    </p>
  )

}
