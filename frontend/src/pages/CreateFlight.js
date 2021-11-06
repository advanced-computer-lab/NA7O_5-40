import React, { useState } from 'react'
import axios from 'axios'

function CreateFlight() {


    let [flight, setFlight] = useState({
        flightNo: 0, departure: '', arrival: '', economySeats: 0,
        businessSeats: 0, airport: ''
    });


    async function formSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/admin/flight", flight);
            window.alert('Flight created')
        }

        catch (err) {
            window.alert('An error occured')

        }
    }



    // const createFlight = () => {
    //     window.alert('HELLO');
    //     axios.post('http://localhost:8000/admin/flight',);
    // }

    function getFlight(e) {
        let myFlight = { ...flight };
        myFlight[e.target.name] = e.target.value;
        setFlight(myFlight);
    }

    return (
        <div >
            <form onSubmit={formSubmit}>
                <div class="mb-3">
                    <label for="flightNo" class="form-label">Flight no</label>
                    <input onChange={getFlight} type="number" class="form-control" name="flightNo" />
                </div>

                <div class="mb-3">
                    <label for="departure" class="form-label">Departure</label>
                    <input onChange={getFlight} type="datetime-local" class="form-control" name="departure" />
                </div>

                <div class="mb-3">
                    <label for="arrival" class="form-label">Arrival</label>
                    <input onChange={getFlight} type="datetime-local" class="form-control" name="arrival" />
                </div>

                <div class="mb-3">
                    <label for="economySeats" class="form-label">Economy Seats</label>
                    <input onChange={getFlight} type="number" class="form-control" name="economySeats" />
                </div>

                <div class="mb-3">
                    <label for="businessSeats" class="form-label">Business Seats</label>
                    <input onChange={getFlight} type="number" class="form-control" name="businessSeats" />
                </div>

                <div class="mb-3">
                    <label for="airport" class="form-label">Airport</label>
                    <input onChange={getFlight} type="text" class="form-control" name="airport" />
                </div>


                <button class="btn btn-primary" onClick={formSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreateFlight
