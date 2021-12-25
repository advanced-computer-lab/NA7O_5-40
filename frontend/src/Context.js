import React, { useContext, createContext, useState, useEffect } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";


export const UserContext = createContext(null);

// const AppContext = createContext(null);
const AuthContext = createContext(null);

export const useAppContext = () => useContext(UserContext);
export const useAuthContext = () => useContext(AuthContext);

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    // Cookies.get("accessToken") ? true : false
    localStorage.getItem('token') ? true : false
  );

  const [userData, setUserData] = useState(
    // Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : {}
    localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}

  );
  const createNotification = (message = "", type = "error") => {
    switch (type) {
      case "info":
        NotificationManager.info(message);
        break;
      case "success":
        NotificationManager.success(message);
        break;
      case "warning":
        NotificationManager.warning(message);
        break;
      case "error":
        NotificationManager.error(message);
        break;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLoggedIn(false);
    } else {
      setUserData(JSON.parse(localStorage.getItem('userData')));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // Cookies.remove("accessToken");
      // Cookies.remove("userData");
      // localStorage.removeItem('token');
      // localStorage.removeItem('userData');

    } else {
      setUserData(
        // Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : {}
        localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
      );
    }
  }, [isLoggedIn]);

  const [searchCriteria, setSearchCriteria] = useState(null);
  const [departureFlights, setDepartureFlights] = useState(null);
  const [returnFlights, setReturnFlights] = useState(null);
  const [chosenDepartureFlight, setChosenDepartureFlight] = useState(null);
  const [chosenReturnFlight, setChosenReturnFlight] = useState(null);
  const [chosenSeatsDeparture, setChosenSeatsDeparture] = useState([]);
  const [chosenSeatsReturn, setChosenSeatsReturn] = useState([]);

  return (
    <UserContext.Provider
      value={{
        searchCriteria,
        setSearchCriteria,
        departureFlights,
        setDepartureFlights,
        returnFlights,
        setReturnFlights,
        chosenDepartureFlight,
        setChosenDepartureFlight,
        chosenReturnFlight,
        setChosenReturnFlight,
        chosenSeatsDeparture,
        setChosenSeatsDeparture,
        chosenSeatsReturn,
        setChosenSeatsReturn,
        createNotification,
        userData,
      }}
    >
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <NotificationContainer />
        {children}
      </AuthContext.Provider>
    </UserContext.Provider>
  );
};
