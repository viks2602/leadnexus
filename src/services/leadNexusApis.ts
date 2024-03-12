import { intentcontacthandler, lookupNaicCode, lookupindustrys, lookupintenttopic, lookupmetroarea, lookuprevenuerange, lookupstate } from "../utils/api.routes";
import apis from "./api";

export const intent_contact_handler_Api = async (data: any) => {
    try {
      const response = await apis.Instance.post(`${intentcontacthandler}`, JSON.stringify(data));
      return response;
    } catch (error) {
      console.log(error);
  
    }
  }


  export const looking_indusrtys_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookupindustrys}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };

  export const looking_revenue_range_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookuprevenuerange}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };

  export const looking_naice_codes_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookupNaicCode}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };

  export const looking_intent_topic_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookupintenttopic}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };

  export const looking_states_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookupstate}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };

  export const looking_metroarea_Api = async () => {
    try {
      const response = await apis.Instance.get(`${lookupmetroarea}`);
      return response;
    } catch (error) {
      console.log(error);
  
    }
  };