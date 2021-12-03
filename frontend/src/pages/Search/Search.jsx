import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function Search(a, b, c, d) {


    const navigate = useNavigate();
    const location = useLocation();
    let cabin = location.state.cabinClass
    let depFlights = [...location.state.departureFlights]
    let retFlights = [...location.state.returnFlights]

    let [chosenDeparture, setChosenDeparture] = useState(null);
    let [chosenReturn, setChosenReturn] = useState(null);

    const chooseDeparture = (event) => {
        console.log(event.target.value)
        setChosenDeparture(event.target.value);
    }

    const chooseReturn = (event) => {
        console.log(event.target.value)
        setChosenReturn(event.target.value);
    }

    // navigate("/home/search/flightDetails", { state: { flight, depFlights, retFlights, cabin } }); }}
    return (
        <>

            <button onClick={() => { navigate("/home") }} type="submit" className='btn btn-primary mt-4 mb-4 py-2 px-5 rounded-pill'>Back</button>

            <div className="w-25 m-auto">
                <h4 className="my-4 border border-2 border-secondary rounded-pill py-2">Departure Flights</h4>
            </div>
            {/* <form> */}
            <table className="table table-hover border border-1 border-secondary table-bordered text-center w-75 m-auto py-3 my-4">
                <thead>
                    <th>Select</th>
                    <th>Flight No</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                </thead>


                <tbody>


                    {location.state.departureFlights.map((flight, key) => {

                        return <tr key={key} >
                            <input type='radio' name='departure' value={flight.flightNo} onChange={chooseDeparture}></input>

                            <td >{flight.flightNo}</td>
                            <td >{flight.departureAirport}</td>
                            <td >{flight.arrivalAirport}</td>
                            <td >{flight.departureDate}</td>
                            <td >{flight.arrivalDate}</td>
                        </tr>
                    })}


                </tbody>


            </table>
            {/* </form> */}
            <div className="w-25 m-auto">
                <h4 className="mt-5 mx-4 border border-2 border-secondary rounded-pill py-2 px-5">Return Flights</h4>
            </div>
            <table className="table border border-1 border-secondary table-hover table-bordered text-center w-75 m-auto py-3 mt-4">
                <thead>
                    <th>Select</th>
                    <th>Flight No</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                </thead>

                <tbody>
                    {location.state.returnFlights.map((flight, key) => {

                        return <tr key={key} >
                            <input type='radio' name='arrival' value={flight.flightNo} onChange={chooseReturn}></input>

                            <td >{flight.flightNo}</td>
                            <td >{flight.departureAirport}</td>
                            <td >{flight.arrivalAirport}</td>
                            <td >{flight.departureDate}</td>
                            <td >{flight.arrivalDate}</td>
                        </tr>
                    })}
                </tbody>

            </table>

            <button className= 'btn btn-primary mt-4 mb-4 py-2 px-5 rounded-pill' onClick={() => {
                if(chosenDeparture == null || chosenReturn == null)
                    return alert('Choose departure and return flights');

                
            }}>Continue</button>


        </>
    )
}


