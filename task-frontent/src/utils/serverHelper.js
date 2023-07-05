import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
      const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // the body will send like this to backend
        body: JSON.stringify(body),
      });
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.log(`error in fetch api `, error);
    }
  };

export const makeAuthenticatedPOSTRequest = async (route, body , token) => {
    try {
      const response = await fetch(backendUrl + route, {
        method: "POST",
        
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // the body will send like this to backend
        body: JSON.stringify(body),
      });
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.log(`error in fetch api `, error);
    }
  };
export const makeAuthenticatedUPDATERequest = async (route, body , token) => {
    try {
      const response = await fetch(backendUrl + route, {
        method: "PUT",
        
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // the body will send like this to backend
        body: JSON.stringify(body),
      });
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.log(`error in fetch api `, error);
    }
  };
export const makeAuthenticatedDELETERequest = async (route, token) => {
    try {
      const response = await fetch(backendUrl + route, {
        method: "DELETE",
        
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // the body will send like this to backend
      });
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.log(`error in fetch api `, error);
    }
  };


  export const makeAuthenticatedGETRequest = async (route , token) => {
    try {
      const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if(!response.ok){
        throw new Error(`Request failed with status ${response.status}`);
  
      }
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.log(`error in fetch api `, error);
    }
  };
  