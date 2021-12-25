import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {

  const [searchCriteria, setSearchCriteria] = useState(null);
  const [departureFlights, setDepartureFlights] = useState(null);
  const [returnFlights, setReturnFlights] = useState(null);
  const [chosenDepartureFlight, setChosenDepartureFlight] = useState(null);
  const [chosenReturnFlight, setChosenReturnFlight] = useState(null);
  const [reservation,setReservation]=useState(null);
  const [chosenSeatsDeparture, setChosenSeatsDeparture] = useState([]);
  const [chosenSeatsReturn, setChosenSeatsReturn] = useState([]);
  const [flightType,setFlightType]=useState("");
  const [cabinClass,setCabinClass]=useState("");
 
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
        reservation,
        setReservation,
        chosenSeatsDeparture,
        setChosenSeatsDeparture,
        chosenSeatsReturn, 
        setChosenSeatsReturn,
        flightType,
        setFlightType,
        cabinClass,
        setCabinClass
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


