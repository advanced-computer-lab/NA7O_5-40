import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { UserContext } from "../../Context";
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";


export default function ReplaceFlight() {
    const navigate = useNavigate();
    const id = useParams();
    const [date, setDate] = useState([]);
    const {flightType,setFlightType,cabinClass,setCabinClass,flightsResults,setFlightsResults,priceDifferences,setPriceDifferences,newCabinClass,setNewCabinClass}= useContext(UserContext);



    async function formSubmit(e) { 
        e.preventDefault();

        try {
            var name = id.id;
           var body={oldFlightId:name,oldCabinClass:cabinClass,departureDate:date,cabinClass:newCabinClass};
            console.log(body);
           var result=await Axios.post('http://localhost:8000/user/searchFlights', body );
           setFlightsResults(result.data.newFlights);  
           setPriceDifferences(result.data.priceDifferences);   
                  console.log(result);                
                  navigate("/user/flightList");      
        }

        catch (err) {
            window.alert(err.response.data)

        }
    } 
    
    function changeDate(e) {    
        setDate(e.target.value);
    }
    
    function changeCabinClass(e) {    
        setNewCabinClass(e.target.value);
    }

        
    
    


    return (
        <form onSubmit={formSubmit}>
                <div class="mb-3">
                    <label for="firstName" class="form-label">Date</label>
                    <input required='true' onChange={changeDate}  type="date" class="form-control" name="firstName" />
                </div>
                <div class="mb-3">
                    <label for="firstName" class="form-label">Cabin Class</label>
                    <input required='true'  onChange={changeCabinClass} type="text" class="form-control" name="firstName" />
                </div>
                <button class="btn btn-primary mb-3">search</button>
                </form>
    )
}