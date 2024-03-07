import {  Route, Routes } from "react-router-dom"
import SignIn from "../../pages/auth/SignIn"
import Layout from "../../pages/layout/Layout"
import ContactSearch from "../../pages/contactsearch/ContactSearch"

const AllRoutes = () => {
  return (
    <Routes>
    <Route index element={<SignIn/>}/>
    <Route path="user" element={<Layout/>}>
       <Route index element={<ContactSearch/>}/> 
    </Route>
   </Routes> 
  )
}

export default AllRoutes