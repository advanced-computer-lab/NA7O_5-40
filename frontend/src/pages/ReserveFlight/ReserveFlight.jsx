import React, { useEffect, useState, useContext } from "react";

import axios from '../../axios'
import { UserContext, useAuthContext, useAppContext } from "../../Context";

import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function ReserveFlight() {
  const { isLoggedIn } = useAuthContext();
  const { createNotification } = useAppContext();

  const navigate = useNavigate();

  const reserve = async () => {
    var reservation = JSON.parse(localStorage.getItem('reservation'))

    await axios.post('/user/reservation/create', reservation);
    createNotification('Reservation created!', 'success');
    navigate('/user/reservations');

    localStorage.removeItem('reservation');
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
