import React, { useState, useEffect } from 'react'
import axios from "../../axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import '../Home/style.css'
function EditUserProfile() {
    let [Userr, setUserProfile] = useState(null);
    const getUserFromBE = () => {
        // const id = "61a4226a3a570728b6b0dfbf";
        axios.get(`/user`)
            .then((response) => {
                console.log(response.data);
                setUserProfile(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        getUserFromBE();
    }, []);
    async function formSubmit(e) {
        e.preventDefault();

        try {
            await axios.post("/user/update", Userr)
            window.alert('User updated')

        }

        catch (err) {
            window.alert(err.response.data)

        }
    }
    function getUser(e) {
        let userr = { ...Userr };
        userr[e.target.name] = e.target.value;
        setUserProfile(userr);
    }


    return (
        Userr == null ?
            <CircularProgress /> :
            <div className='home-container' style={{
                paddingLeft: 550,
                paddingRight: 550,
                paddingTop: 0,
                backgroundImage:
                    "url(https://media.npr.org/assets/img/2021/10/06/gettyimages-1302813215_wide-6c48e5a6aff547d2703693450c4805978de47435-s1100-c50.jpg)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: '100vh'
            }} >
                <div className="container">


                    <form onSubmit={formSubmit}>
                        <div class="mb-3">
                            <label style={{ color: "white", fontWeight: "bold" }} for="firstName" class="form-label">First Name</label>
                            <input required='true' value={Userr.firstName} onChange={getUser} type="text" class="form-control" name="firstName" />
                        </div>

                        <div class="mb-3">
                            <label style={{ color: "white", fontWeight: "bold" }} for="lastName" class="form-label">Last Name</label>
                            <input required='true' value={Userr.lastName} onChange={getUser} type="text" class="form-control" name="lastName" />
                        </div>

                        <div class="mb-3">
                            <label style={{ color: "white", fontWeight: "bold" }} for="passportNumber" class="form-label">Passport Number</label>
                            <input required='true' value={Userr.passportNumber} onChange={getUser} type="text" class="form-control" name="passportNumber" />
                        </div>

                        <div class="mb-3">
                            <label style={{ color: "white", fontWeight: "bold" }} for="email" class="form-label">Email</label>
                            <input required='true' value={Userr.email} onChange={getUser} type="text" class="form-control" name="email" />
                        </div>
                        <button style={{ color: "white", fontWeight: "bold" }} class="btn btn-primary mb-3">Update</button>
                    </form>
                    <Link style={{ color: "white", fontWeight: "bold" }} to='/user/changepassword'>Change Password</Link>

                </div>
                <div style={{ height: 30 }} ></div>
            </div >
    )
}




export default EditUserProfile
