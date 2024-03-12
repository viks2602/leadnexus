import {  Route, Routes } from "react-router-dom"
import SignIn from "../../pages/auth/SignIn"
import Layout from "../../pages/layout/Layout"
import ContactSearch from "../../pages/contactsearch/ContactSearch"
import PrivateRoute from "../../components/privateroute/PrivateRoute"

const AllRoutes = () => {
  return (
    <Routes>
    <Route index element={<SignIn/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path="user" element={<Layout/>}>
       <Route index element={<ContactSearch/>}/> 
    </Route>
    </Route>
   </Routes> 
  )
}

export default AllRoutes