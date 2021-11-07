import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';


function EditFlight() {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        console.log(location.state)
        setFlight(location.state);
    }, []);

    let [flight, setFlight] = useState({
        flightNo: 0, departureDate: '', arrivalDate: '', economySeats: 0,
        businessSeats: 0, arrivalAirport: '', departureAirport: ''
    });


    async function formSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/admin/flight/update", flight);

            window.alert('Flight updated')
            navigate('/flights')
        }

        catch (err) {
            window.alert('An error occured')

        }
    }

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
                    <input required='true'  value={flight.flightNo} onChange={getFlight} type="number" class="form-control" name="flightNo" />
                </div>

                <div class="mb-3">
                    <label for="departureDate" class="form-label">Departure date and time</label>
                    <input required='true'  value={flight.departureDate.split('.')[0]} onChange={getFlight} type="datetime-local" class="form-control" name="departureDate" />
                </div>

                <div class="mb-3">
                    <label for="arrivalDate" class="form-label">Arrival date and time</label>
                    <input required='true'  value={flight.arrivalDate.split('.')[0]} onChange={getFlight} type="datetime-local" class="form-control" name="arrivalDate" />
                </div>

                <div class="mb-3">
                    <label for="economySeats" class="form-label">Economy Seats</label>
                    <input required='true'  value={flight.economySeats} onChange={getFlight} type="number" class="form-control" name="economySeats" />
                </div>

                <div class="mb-3">
                    <label for="businessSeats" class="form-label">Business Seats</label>
                    <input required='true'  value={flight.businessSeats} onChange={getFlight} type="number" class="form-control" name="businessSeats" />
                </div>

                <div class="mb-3">
                    <label for="departureAirport" class="form-label">Departure Airport</label>
                    <input required='true'  value={flight.departureAirport} onChange={getFlight} type="text" class="form-control" name="departureAirport" />
                </div>

                <div class="mb-3">
                    <label for="arrivalAirport" class="form-label">Arrival Airport</label>
                    <input required='true'  value={flight.arrivalAirport} onChange={getFlight} type="text" class="form-control" name="arrivalAirport" />
                </div>

                <button class="btn btn-primary mb-3" onClick={formSubmit}>Submit</button>
            </form>

            <Link to="/flights">Back</Link>
            <div style={{ height: 30 }} ></div>
        </div>
    )
}

export default EditFlight
