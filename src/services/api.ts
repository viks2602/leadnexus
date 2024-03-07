import axios from "axios";
import { baseUrl , zoomInfoUrl } from "../config/config";
    
const Instance = axios.create({
    baseURL: `${baseUrl}/api/`,
   headers: {
        "Content-Type": "application/json",
        
    }
});

const ZoomInfoInstance = axios.create({
    baseURL: `${zoomInfoUrl}`,
    headers: {
         "Content-Type": "application/json",
         Authorization: `${sessionStorage.getItem('token')}`,
     }
})

const apis = {
   Instance,
   ZoomInfoInstance
}

export default apis;