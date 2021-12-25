import React, { useEffect, useState, useContext } from "react";

import axios from '../../axios'
import { UserContext, useAuthContext, useAppContext } from "../../Context";

import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function Cancel() {
  const { isLoggedIn } = useAuthContext();
  const { createNotification } = useAppContext();

  const navigate = useNavigate();

  const paymentCancelled = async () => {
    
    createNotification('Payment failed, please try again later', 'error');
    navigate('/user/reservations');

    localStorage.removeItem('reservation');
  }

  useEffect(() => {
    paymentCancelled();
  }, []);

  return (
    <p>
      Payment cancelled
    </p>
  )

}
