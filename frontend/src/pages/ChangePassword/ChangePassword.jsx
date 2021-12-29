import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiPhoneNumber from 'mui-phone-number';


// import axios from "axios";
import axios from '../../axios'
import { useAppContext } from "../../Context";


export default function ChangePassword() {
  const { createNotification } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var oldPassword = data.get('oldPassword');
    var newPassword = data.get('newPassword');
    var confirmPassword = data.get('confirmPassword');

    if(!oldPassword){
      return createNotification('Please enter your old password', 'warning');
    }

    if(!newPassword){
      return createNotification('Please enter a new password', 'warning');
    }

    if (newPassword != confirmPassword) {
      return createNotification('Passwords do not match', 'warning');
    }

    var info = {
      'oldPassword': oldPassword,
      'newPassword': newPassword
    };

    let res = await axios.post('/user/update-password', info);


    if(!res.data.status){
      return createNotification(res.data.message, 'error');

    }

    return createNotification(res.data.message, 'success');

  };

  return (
    <Container component="main" maxWidth="xs" >

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>




            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>


          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>

        </Box>
      </Box>
    </Container>
  );
}