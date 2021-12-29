import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { UserContext } from "../../Context";
import '../Home/style.css';
import style from './Search.module.css';
export default function Search() {

    const { departureFlights, returnFlights, setChosenDepartureFlight, setChosenReturnFlight } = useContext(UserContext)

    const navigate = useNavigate();
    const location = useLocation();

    // let cabin = location.state.cabinClass
    // let depFlights = [...location.state.departureFlights]
    // let retFlights = [...location.state.returnFlights]

    useEffect(() => {
        console.log(returnFlights)
        if (departureFlights == null || returnFlights == null)
            navigate('/home');

    }, []);

    let [chosenDeparture, setChosenDeparture] = useState(null);
    let [chosenReturn, setChosenReturn] = useState(null);

    const chooseDeparture = (event) => {
        // console.log(event.target.value)
        var flightID = event.target.value;

        var flight = departureFlights.filter((element) => element._id == flightID)[0];
        console.log(flight)
        setChosenDepartureFlight(flight);
        setChosenDeparture(flight);
    }

    const chooseReturn = (event) => {
        // console.log(event.target.value)
        var flightID = event.target.value;

        var flight = returnFlights.filter((element) => element._id == flightID)[0];
        // console.log(flight)
        setChosenReturn(flight);
        setChosenReturnFlight(flight);
    }

    // navigate("/home/search/flightDetails", { state: { flight, depFlights, retFlights, cabin } }); }}
    return (

        departureFlights != null &&
        returnFlights != null &&
        <div className={`${style.backgroundimg}`}>
            <div className={`${style.back}`}>
                <div className='container mb-5'>
                    <button onClick={() => { navigate("/home") }} type="submit" className='btn btn-secondary mt-4 mb-4 py-2 px-5 rounded-pill font-weight-bold'>Back</button>

                    <div className="w-25 m-auto">
                        <h4 className="my-4 border border-2 border-secondary rounded-pill py-2 text-light font-weight-bold">Departure Flights</h4>
                    </div>
                    {/* <form> */}
                    <table className="table table-hover border border-1 border-secondary table-bordered text-center text-light w-75 m-auto py-3 my-4 font-weight-bold">
                        <thead>
                            <th>Select</th>
                            <th>Flight No</th>
                            <th>Departure Airport</th>
                            <th>Arrival Airport</th>
                            <th>Departure Date</th>
                            <th>Arrival Date</th>
                            <th></th>

                        </thead>


                        <tbody>


                            {departureFlights.map((flight, key) => {

                                return <tr key={key} >
                                    <input type='radio' name='departure' value={flight._id} onChange={chooseDeparture}></input>

                                    <td >{flight.flightNo}</td>
                                    <td >{flight.departureAirport}</td>
                                    <td >{flight.arrivalAirport}</td>
                                    <td >{flight.departureDate}</td>
                                    <td >{flight.arrivalDate}</td>
                                    <td><button onClick={() => { navigate("/home/search/flightDetails", { state: { flight } }); }} className='btn btn-secondary'>Details</button></td>
                                </tr>
                            })}


                        </tbody>


                    </table>
                    {/* </form> */}
                    <div className="w-25 m-auto">
                        <h4 className="mt-5 mx-4 border border-2 border-secondary rounded-pill py-2 px-5 text-light font-weight-bold">Return Flights</h4>
                    </div>
                    <table className="table border border-1 border-secondary table-hover table-bordered text-center  w-75 m-auto py-3 mt-4 text-light font-weight-bold">
                        <thead>
                            <th>Select</th>
                            <th>Flight No</th>
                            <th>Departure Airport</th>
                            <th>Arrival Airport</th>
                            <th>Departure Date</th>
                            <th>Arrival Date</th>
                        </thead>

                        <tbody>
                            {returnFlights.map((flight, key) => {

                                return <tr key={key} >
                                    <input type='radio' name='arrival' value={flight._id} onChange={chooseReturn}></input>

                                    <td >{flight.flightNo}</td>
                                    <td >{flight.departureAirport}</td>
                                    <td >{flight.arrivalAirport}</td>
                                    <td >{flight.departureDate}</td>
                                    <td >{flight.arrivalDate}</td>
                                    <td><button onClick={() => { navigate("/home/search/flightDetails", { state: { flight } }); }} className='btn btn-secondary'>Details</button></td>

                                </tr>
                            })}
                        </tbody>

                    </table>

                    <button className='btn btn-secondary font-weight-bold mt-4 mb-4 py-2 px-5 rounded-pill' onClick={() => {
                        if (chosenDeparture == null || chosenReturn == null)
                            return alert('Choose departure and return flights');

                        navigate("/user/chooseseats");

                    }}>Continue</button>
                </div>
            </div>
        </div>
    )
}


