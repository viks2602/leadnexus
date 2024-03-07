import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Stack, TextField, Typography } from "@mui/material"
import authClient from 'zoominfo-api-auth-client';
import { FcGoogle } from "react-icons/fc";


const SignIn = () => {
    const [loggedin , setloggedin] = useState('')
    const navigate = useNavigate();
    const user_id = import.meta.env.VITE_ZOOM_USER_ID
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const private_key = import.meta.env.VITE_ZOOM_INFO_PRIVATE_KEY;
    const zoomInfoTokenGet =  async()=>{
  
      const zoomInfoToken = await authClient.getAccessTokenViaPKI(user_id,client_id , private_key);
      sessionStorage.setItem('token',zoomInfoToken)
      zoomInfoToken && navigate('user')
    }
    useEffect(()=>{
      loggedin== 'userlogged' && zoomInfoTokenGet()
    },[loggedin])
    return (
        <Box height='100vh' display='flex' justifyContent='center' alignItems='center' bgcolor={'#F2F6FF'}>
            <form style={{ width: 400 }}>
                <Stack direction='column' spacing={2} p={3} bgcolor={'#fff'}>
                    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                        <Avatar sx={{ height: 70, width: 70 }} />
                        <Typography>Welcome Back, Alex</Typography>
                        <Typography variant="body2">Sign in to your account to continue</Typography>
                    </Box>
                    <FormControl>
                        <label htmlFor='email' ><Typography color='#C2C2C2'> Email Address</Typography></label>
                        <TextField
                            variant="standard"
                        ></TextField>
                    </FormControl>
                    <FormControl>
                        <label htmlFor='password' ><Typography color='#C2C2C2'> Password</Typography></label>
                        <TextField
                            variant="standard"
                        ></TextField>
                    </FormControl>
                    <FormControlLabel control={<Checkbox style={{ color: '#777777' }} />} label={<Typography color='#777777'>Remember me</Typography>} />
                    <Button variant="contained">Sign In</Button>
                    <Typography sx={{ display: 'flex', justifyContent: 'center' }}>OR</Typography>
                    <Button startIcon={<FcGoogle/>} onClick={()=>setloggedin('userlogged')} >Continue with Google</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default SignIn