import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';


function EditUserProfile() {


    const [Userr, setUserProfile] = useState({
        firstName:'', lastName: '',passportNumber: '' , Email: ''
     });
     
    useEffect(() => {    
        axios.get("http://localhost:8000/User").then( (allUsers)=>{
            setUserProfile(allUsers.data);
            
        })
    }, []);


    

    async function formSubmit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/User/update", Userr)
            window.alert('User updated')
          
        }

        catch (err) {
            window.alert(err.response.data)

        }
    }

    function getUser(e) {
        let userr = { ... Userr};
       userr[e.target.name] = e.target.value;
        setUserProfile(userr);
    }

    return (
        <div >
            <form onSubmit={formSubmit}>
                <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input required='true' value={Userr.firstName} onChange={getUser} type="text" class="form-control" name="firstName" />
                </div>

                <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input required='true' value={Userr.lastName} onChange={getUser} type="text" class="form-control" name="lastName" />
                </div>

                <div class="mb-3">
                    <label for="passportNumber" class="form-label">Passport Number</label>
                    <input required='true' value={Userr.passportNumber} onChange={getUser} type="text" class="form-control" name="passportNumber" />
                </div>

                <div class="mb-3">
                    <label for="Email" class="form-label">Email</label>
                    <input required='true' value={Userr.Email} onChange={getUser} type="text" class="form-control" name="Email" />
                </div>
                <button class="btn btn-primary mb-3">Update</button>
            </form>

            <Link to="/Home">Back</Link>
            <div style={{ height: 30 }} ></div>
        </div>
    )
}




export default EditUserProfile
