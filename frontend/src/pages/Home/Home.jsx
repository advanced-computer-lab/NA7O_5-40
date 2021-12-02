import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';

export default function Home() {

  const navigate = useNavigate();

  let [flight, setFlight] = useState({
    adults: 1,
    children: 0,
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    cabinClass: ''
  });

  // const [data, setData] = useState([])

  function getFlight(e) {
    let myFlight = { ...flight };
    myFlight[e.target.name] = e.target.value;
    setFlight(myFlight);
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {

      let { data } = await axios.post('http://localhost:8000/user/flights/search', flight);

      //setData(data);
      // data = [{},{},{}]
      // console.log(data);
      // <Search result={data} />
      if (data.length > 0) {
        navigate('/home/search', { state: { data } });
      }
    } catch (err) {
      window.alert(err);
    }
  }

  return (
    <div>
      <div className='w-75 mx-auto py-4'>

        <form onSubmit={formSubmit}>

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
            <label htmlFor='cabinClass' className='form-label'>
              Cabin Class
            </label>
            <input
              onChange={getFlight}
              required='true'
              type='text'
              className='form-control'
              name='cabinClass'
            />
          </div>


          <button type="submit" className='btn btn-primary mt-3'>Show Flights</button>
        </form>

        <div style={{ height: 30 }}></div>
      </div>
    </div>
  );
}
