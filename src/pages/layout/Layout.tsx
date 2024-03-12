import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { logo } from "../../assets/logo"
import { Outlet, useNavigate } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar sx={{ bgcolor: '#232F3E' }}>
        <Box display='flex' alignItems='center' flexDirection={'row'} justifyContent={'space-between'}>
          <Box height={'55px'} display={'flex'}>
            <Box>
              <img src={logo} width='100%' height='100%' />
            </Box>
            <Typography color={"#fff"} fontSize={'32px'} fontWeight={600} ml={2}>Lead Nexus</Typography>
          </Box>
          <Button sx={{color:'#fff'}} onClick={() => { navigate('/'); sessionStorage.clear() }}>Logout</Button>
        </Box>

      </AppBar>
      <Toolbar variant='dense' disableGutters sx={{ minHeight: '55px', height: '55px' }} />
      <Outlet />
    </Box>
  )
}

export default Layout