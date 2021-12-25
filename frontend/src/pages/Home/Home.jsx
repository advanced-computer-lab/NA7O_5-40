import React, { useState, useContext } from "react";
import axios from "../../axios";
import { UserContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import { useAppContext, useAuthContext } from "../../Context";
//Styles
import "./style.css";

const Home = () => {
  const { setSearchCriteria, setReturnFlights, setDepartureFlights, searchCriteria } = useContext(UserContext)
  const navigate = useNavigate();
  const { createNotification } = useAppContext();


  const [searchData, setSearchData] = useState({
    adults: null,
    children: null,
    departureAirport: "",
    returnAirport: "",
    departureDate: "",
    returnDate: "",
    cabinClass: "",
  });

  async function formSubmit(e) {
    console.log('searchings')
    e.preventDefault();

    try {

      if(!searchData.adults || !searchData.children){
        return createNotification("Please enter number of adults and children.", "warning");
      }

      if(!searchData.departureAirport || !searchData.returnAirport){
        return createNotification("Please enter departure and return airports.", "warning");
      }

      if(!searchData.departureDate || !searchData.returnDate){
        return createNotification("Please enter departure and return dates.", "warning");
      }

      if(!searchData.cabinClass){
        return createNotification("Please enter cabin class.", "warning");
      }
      let { data } = await axios.post('/user/flights/search', searchData);
      let { departureFlights, returnFlights } = data



      if (departureFlights.length > 0 && returnFlights.length > 0) {
        setSearchCriteria(searchData);
        console.log(searchCriteria);
        setDepartureFlights(departureFlights);
        setReturnFlights(returnFlights)
        // navigate('/home/search', { state: { departureFlights, returnFlights, cabinClass } });
        navigate('/home/search');

      }

    } catch (err) {
      console.log(err.response);
      // window.alert(err.response.data);
      if(!err.response){
        return createNotification('Network problem', "error");

      }
      return createNotification(err.response.data, "warning");

    }
  }

  return (
    <div className="home-container">
      <div className="container">
        <h2>Search a flight</h2>
        <div className="inputs-container">
          <div>
            <label>No. of adults</label>
            <input
              type="number"
              placeholder="No. of adults"
              value={searchData.adults}
              onChange={(e) => {
                setSearchData({ ...searchData, adults: e.target.value });
              }}
            />
          </div>
          <div>
            <label>No. of children</label>
            <input
              type="number"
              placeholder="No. of children"
              value={searchData.children}
              onChange={(e) => {
                setSearchData({ ...searchData, children: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Departure Airport</label>
            <input
              type="text"
              placeholder="Departure Airport"
              value={searchData.departureAirport}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  departureAirport: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label>Return Airport</label>
            <input
              type="text"
              placeholder="Return Airport"
              value={searchData.returnAirport}
              onChange={(e) => {
                setSearchData({ ...searchData, returnAirport: e.target.value });
              }}
            />
          </div>
          <div className="date-inputs">
            <div>
              <label>Departure Date</label>
              <input
                type="date"
                placeholder="Departure Date"
                value={searchData.departureDate}
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    departureDate: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>Return Date</label>
              <input
                type="date"
                placeholder="Return Date"
                value={searchData.returnDate}
                onChange={(e) => {
                  setSearchData({ ...searchData, returnDate: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="select-item">
            <label>Cabin Class</label>

            <select
              onChange={async (e) => {
                setSearchData({ ...searchData, cabinClass: e.target.value });
              }}
              value={searchData.cabinClass}
            >
              <option value="" selected disabled unselectable>
                Cabin Class
              </option>
              <option value="business">Business</option>
              <option value="economy">Economy</option>
            </select>
            <span></span>
          </div>
          <div>
            <button onClick={formSubmit}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
