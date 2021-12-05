import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context";
import NavBar from './NavBar'
export default function Home() {

  const navigate = useNavigate();
  const { setSearchCriteria, setReturnFlights, setDepartureFlights, searchCriteria } = useContext(UserContext)

  // use State for Departure and Arrival Flights
  let [flight, setFlight] = useState({
    adults: 1,
    children: 0,
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    cabinClass: 'economy'

  });

  // Function to setState the flight 
  function getFlight(e) {
    let myFlight = { ...flight };
    myFlight[e.target.name] = e.target.value;
    setFlight(myFlight);
    console.log(myFlight);
  }

  // Function to call the api and contains the submit logic
  async function formSubmit(e) {
    e.preventDefault();

    try {

      
      let { data } = await axios.post('http://localhost:8000/user/flights/search', flight);
      let { departureFlights, returnFlights } = data



      if (departureFlights.length > 0 && returnFlights.length > 0) {
        setSearchCriteria(flight);
        console.log(searchCriteria);
        setDepartureFlights(departureFlights);
        setReturnFlights(returnFlights)
        // navigate('/home/search', { state: { departureFlights, returnFlights, cabinClass } });
        navigate('/home/search');

      } 

    } catch (err) {
      console.log(err.response);
      window.alert(err.response.data);
    }
  }

  return (
    <div>
      <NavBar />
      <div className='w-75 mx-auto py-4'>

        <form>

          <div className="mb-3 mt-5
          ">
            <label htmlFor='adults' className="form-label">
              Adults
            </label>
            <input onChange={getFlight} required type='number' className='form-control' name='adults' />
          </div>

          <div className="my-3">
            <label htmlFor='children' className="form-label"> Children </label>
            <input onChange={getFlight} required type='number' className='form-control' name='children' />
          </div>

          <div className="my-3">
            <label htmlFor='departureAirport' className='form-label'> Departure Airport </label>
            <input onChange={getFlight} required='true' type='text' className='form-control' name='departureAirport' />
          </div>

          <div className="my-3">
            <label htmlFor='arrivalAirport' className='form-label'>
              Arrival Airport
            </label>
            <input
              onChange={getFlight}
              required='true'
              type='text'
              className='form-control'
              name='arrivalAirport'
            />
          </div>

          <div className="my-3">
            <label htmlFor='departureDate' className='form-label'>
              Departure Date
            </label>
            <input
              onChange={getFlight}
              required='true'
              type='date'
              className='form-control'
              name='departureDate'
            />
          </div>

          <div className="my-3">
            <label htmlFor='returnDate' className='form-label'>
              Return Date
            </label>
            <input
              onChange={getFlight}
              required='true'
              type='date'
              className='form-control'
              name='returnDate'
            />
          </div>

          <div className="my-3">
            <label htmlFor='cabinClass' className='form-label'>
              Cabin Class
            </label>


            <select onChange={getFlight} className='form-control' name="cabinClass">
              <option value="economy">Economy</option>
              <option value="business">Business</option>

            </select>

            {/* <input

              onChange={getFlight}
              required='true'
              type=''
              className='form-control'
              name='cabinClass'
            /> */}
          </div>

          <button onClick={formSubmit} type="submit" className='btn btn-primary mt-3 py-3 px-4 rounded-pill'>Search</button>

        </form>

        <div style={{ height: 30 }}></div>
      </div>
    </div>
  );
}
