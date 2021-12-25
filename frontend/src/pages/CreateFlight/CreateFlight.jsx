import React, { useState } from 'react';
import axios from '../../axios'

import { Link, useNavigate } from 'react-router-dom';

function CreateFlight() {
  const navigate = useNavigate();

  let [flight, setFlight] = useState({
    flightNo: 0,
    departureDate: '',
    arrivalDate: '',
    economySeats: 0,
    businessSeats: 0,
    arrivalAirport: '',
    departureAirport: ''
  });

  async function formSubmit(e) {
    e.preventDefault();
    if (Date.parse(flight.arrivalDate) <= Date.parse(flight.departureDate)) {
      return window.alert('Arrival time cannot be before departure time');
    }

    try {
      await axios.post('http://localhost:8000/admin/flight/create', flight);

      window.alert('Flight created');
      navigate('/flights');
    } catch (err) {
      window.alert(err);
    }
  }

  function getFlight(e) {
    let myFlight = { ...flight };
    myFlight[e.target.name] = e.target.value;
    setFlight(myFlight);
  }

  return (
    <div>
      <div className='w-75 mx-auto py-4'>
        <form onSubmit={formSubmit}>

          <div className="my-2">
            <label htmlFor='flightNo'>
              Flight no
            </label>
            <input
              required
              onChange={getFlight}
              type='text'
              className='form-control'
              name='flightNo'
            />
          </div>

          <div className="my-2">
            <label htmlFor='departureDate' className='form-label'>
              Departure date and time
            </label>
            <input
              required='true'
              onChange={getFlight}
              type='datetime-local'
              className='form-control'
              name='departureDate'
            />
          </div>

          <div className="my-2">
            <label htmlFor='arrivalDate' className='form-label'>
              Arrival date and time
            </label>
            <input
              required='true'
              onChange={getFlight}
              type='datetime-local'
              className='form-control'
              name='arrivalDate'
            />
          </div>

          <div className="my-2">
            <label htmlFor='economySeats' className='form-label'>
              Economy Seats
            </label>
            <input
              required='true'
              onChange={getFlight}
              type='number'
              className='form-control'
              name='economySeats'
            />
          </div>

          <div className="my-2">
            <label htmlFor='businessSeats' className='form-label'>
              Business Seats
            </label>
            <input
              required
              onChange={getFlight}
              type='number'
              className='form-control'
              name='businessSeats'
            />
          </div>

          <div className="my-2">
            <label htmlFor='departureAirport' className='form-label'>
              Departure Airport
            </label>
            <input
              required='true'
              onChange={getFlight}
              type='text'
              className='form-control'
              name='departureAirport'
            />
          </div>

          <div className="my-2">
            <label htmlFor='arrivalAirport' className='form-label'>
              Arrival Airport
            </label>
            <input
              required='true'
              onChange={getFlight}
              type='text'
              className='form-control'
              name='arrivalAirport'
            />
          </div>
          <button type="submit" className='btn btn-primary mt-3'>Submit</button>
        </form>

        <Link to='/flights'>Back</Link>
        <div style={{ height: 20 }}></div>
      </div>
    </div>
  );
}

export default CreateFlight;
