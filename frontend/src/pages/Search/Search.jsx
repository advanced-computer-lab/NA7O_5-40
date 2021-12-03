import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function Search(a,b,c,d) {

    
    const navigate = useNavigate();
    const location = useLocation();
    let cabin = location.state.cabinClass
    let depFlights = [...location.state.departureFlights]
    let retFlights = [...location.state.returnFlights]

    return (
        <>

            <button onClick={() => { navigate("/home") }} type="submit" className='btn btn-primary mt-4 mb-4 py-2 px-5 rounded-pill'>Back</button>

            <div className="w-25 m-auto">
                <h4 className="my-4 border border-2 border-secondary rounded-pill py-2">Departure Flights</h4>
            </div>
            <table className="table table-hover border border-1 border-secondary table-bordered text-center w-75 m-auto py-3 my-4">
                <thead>
                    <th>Flight No</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                </thead>

                <tbody>
                    {location.state.departureFlights.map((flight, key) => {

                        return <tr onClick={() => { navigate("/home/search/flightDetails", { state: { flight, depFlights, retFlights , cabin } }); }} key={key} >
                            <td >{flight.flightNo}</td>
                            <td >{flight.departureAirport}</td>
                            <td >{flight.arrivalAirport}</td>
                            <td >{flight.departureDate}</td>
                            <td >{flight.arrivalDate}</td>
                        </tr>
                    })}
                </tbody>



            </table>
            <div className="w-25 m-auto">
                <h4 className="mt-5 mx-4 border border-2 border-secondary rounded-pill py-2 px-5">Return Flights</h4>
            </div>
            <table className="table border border-1 border-secondary table-hover table-bordered text-center w-75 m-auto py-3 mt-4">
                <thead>
                    <th>Flight No</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                </thead>

                <tbody>
                    {location.state.returnFlights.map((flight, key) => {

                        return <tr key={key} onClick={() => { navigate("/home/search/flightDetails", { state: { flight, depFlights, retFlights ,cabin} }); }} >
                            <td >{flight.flightNo}</td>
                            <td >{flight.departureAirport}</td>
                            <td >{flight.arrivalAirport}</td>
                            <td >{flight.departureDate}</td>
                            <td >{flight.arrivalDate}</td>
                        </tr>
                    })}
                </tbody>

            </table>
        </>
    )
}


