import React from 'react'
import { useLocation } from 'react-router';


export default function Search() {
    // console.log("Aloooooooooooooooooooo");
    // console.log(data)
    const location = useLocation();

    
    return (
        // <div>
        //     {location.state.name}
        // </div>
        <>
            <table class="table table-hover text-center w-75 m-auto py-3">
                <thead>
                    <th>Flight No</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Terminal</th>
                    <th>Arrival Terminal</th>
                    <th>Departure Date</th>
                    <th>Arrival Date</th>
                    <th>Economy Price</th>
                    <th>Business Price</th>
                    <th>Baggage Allowance</th>
                </thead>

                <tbody>
                    {location.state.data.map((flight, key) => {

                        return <tr key={key} >
                            <td >{flight.flightNo}</td>
                            <td >{flight.departureAirport}</td>
                            <td >{flight.arrivalAirport}</td>
                            <td >{flight.departureTerminal}</td>
                            <td >{flight.arrivalTerminal}</td>
                            <td >{flight.departureDate}</td>
                            <td >{flight.arrivalDate}</td>
                            <td >{flight.economyPrice}</td>
                            <td >{flight.businessPrice}</td>
                            <td >{flight.baggageAllowance}</td>
                        </tr>
                    })}
                </tbody>

            </table>
        </>
    )
}


// onClick={()=>{
//     // navigate('',state:{flight})
// }}