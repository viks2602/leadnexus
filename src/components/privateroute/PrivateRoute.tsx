import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = sessionStorage.getItem('token');
  
  if(Boolean(token) === true) return <Outlet/> ;

  return <Navigate to='/'/>
}

export default PrivateRoute