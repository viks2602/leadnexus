import { lookingupContacts, lookupNaicCodeRoute, lookupindustry, lookupintenttopics, lookuprevenue } from "../utils/api.routes";
import apis from "./api";


export const looking_naice_code_Api = async () => {
  try {
    const response = await apis.ZoomInfoInstance.get(`${lookupNaicCodeRoute}`);
    return response;
  } catch (error) {
    console.log(error);

  }
};

export const looking_revenue_Api = async () => {
  try {
    const response = await apis.ZoomInfoInstance.get(`${lookuprevenue}`);
    return response;
  } catch (error) {
    console.log(error);

  }
};

export const looking_indusrty_Api = async () => {
  try {
    const response = await apis.ZoomInfoInstance.get(`${lookupindustry}`);
    return response;
  } catch (error) {
    console.log(error);

  }
};

export const looking_intent_topics_Api = async () => {
  try {
    const response = await apis.ZoomInfoInstance.get(`${lookupintenttopics}`);
    return response;
  } catch (error) {
    console.log(error);

  }
};

export const contact_search_Api = async (data: any) => {
  try {
    const response = await apis.ZoomInfoInstance.post(`${lookingupContacts}`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log(error);

  }
}