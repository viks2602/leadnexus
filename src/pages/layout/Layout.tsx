import { AppBar, Box, Toolbar, Typography} from "@mui/material"
import { logo } from "../../assets/logo"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <Box>
     <AppBar sx={{bgcolor:'#232F3E'}}>
      <Box display='flex' alignItems='center' >
       <Box height={'64px'} display={'flex'}>
        <img src={logo} width='100%' height='100%'/>
       </Box>
        <Typography color={"#fff"} fontSize={'32px'} fontWeight={600} ml={2}>Lead Nexus</Typography>
      </Box>
     </AppBar>
     <Toolbar/>
     <Outlet/>
    </Box>
  )
}

export default Layout