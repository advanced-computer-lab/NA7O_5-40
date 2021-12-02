import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';

export default function Home() {

  const navigate = useNavigate();

  // use State for Departure Flight
  let [flightDep, setFlightDep] = useState({
    adults: 1,
    children: 0,
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    cabinClass: ''
  });

  // use State for Return Flight
  let [flightRet, setFlightRet] = useState({
    adults: 1,
    children: 0,
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    cabinClass: ''
  });

  // Get Departure Flight
  function getFlightDep(e) {
    let myDepFlight = { ...flightDep };
    myDepFlight[e.target.name] = e.target.value;
    setFlightDep(myDepFlight);
  }

  // Get Return Flight
  function getFlighRet(e) {
    let myRetFlight = { ...flightRet };
    myRetFlight[e.target.name] = e.target.value;
    setFlightRet(myRetFlight);
  }

  // Get the Return Departure Airport 
  function getRetDepAir(e) {
    let myRetFlight = { ...flightRet };
    myRetFlight.departureAirport = e.target.value;
    setFlightRet(myRetFlight);
  }

  // Get the Return Arrival airport 
  function getRetArrAir(e) {
    let myRetFlight = { ...flightRet };
    myRetFlight.arrivalAirport = e.target.value;
    setFlightRet(myRetFlight);
  }

  // Get the Return Date
  function getRetDate(e) {
    let myRetFlight = { ...flightRet };
    myRetFlight.departureDate = e.target.value;
    setFlightRet(myRetFlight);
  }

  // Form Submit for Departure Flights
  async function formSubmitDep(e) {
    e.preventDefault();
    try {

      let { data } = await axios.post('http://localhost:8000/user/flights/search', flightDep);
      
      if (data.length > 0) {
        navigate('/home/search', { state: { data } });
      }
      else {
        window.alert("No Flights Avaiable !");
      }
    } catch (err) {
      window.alert(err);
    }
  }


  // Form Submit for Return Flights
  async function formSubmitRet(e) {
    e.preventDefault();
    try {

      console.log(flightRet);
      let { data } = await axios.post('http://localhost:8000/user/flights/search', flightRet);

      console.log(data);
      if (data.length > 0) {
        navigate('/home/search', { state: { data } });
      }
      else {
        window.alert("No Return Flights Avaiable !");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  return (
    <div>
      <div className='w-75 mx-auto py-4'>

        <form>

          <div className="mb-3 mt-5
          ">
            <label htmlFor='adults' className="form-label">
              Adults
            </label>
            <input onChange={(e) => { getFlightDep(e); getFlighRet(e) }} required type='number' className='form-control' name='adults' />
          </div>

          <div className="my-3">
            <label htmlFor='children' className="form-label"> Children </label>
            <input onChange={(e) => { getFlightDep(e); getFlighRet(e) }} required type='number' className='form-control' name='children' />
          </div>

          <div className="my-3">
            <label htmlFor='departureAirport' className='form-label'> Departure Airport </label>
            <input onChange={(e) => { getFlightDep(e); getRetArrAir(e) }} required='true' type='text' className='form-control' name='departureAirport' />
          </div>

          <div className="my-3">
            <label htmlFor='arrivalAirport' className='form-label'>
              Arrival Airport
            </label>
            <input
              onChange={(e) => { getFlightDep(e); getRetDepAir(e) }}
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
              onChange={getFlightDep}
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
              onChange={getRetDate}
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
            <input
              onChange={(e) => { getFlightDep(e); getFlighRet(e) }}
              required='true'
              type='text'
              className='form-control'
              name='cabinClass'
            />
          </div>


          <button onClick={formSubmitRet} type="submit" className='btn btn-primary mt-3 p-3 rounded-pill me-5'>Show Return Flights</button>

          <button onClick={formSubmitDep} type="submit" className='btn btn-primary mt-3 p-3 rounded-pill ms-5'>Show Departure Flights</button>

        </form>

        <div style={{ height: 30 }}></div>
      </div>
    </div>
  );
}
