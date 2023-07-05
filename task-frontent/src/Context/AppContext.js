import { createContext } from "react";
import { useState  } from "react";
import { useCookies } from "react-cookie";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";




export const AppContext = createContext();

export default function AppContextProvider({children}){
   
//  this is for update task
const [updateTask , setUpdateTask] = useState({
   show:false,
   id:""
})


// for which type user is available
const [userType , setUserType] = useState('');

   // for all user email 
   let [userEmail , setUserEmail] = useState([]);

   // for all own task 
   const [allOwnTask , setAllOwnTask] = useState([]);


    
   const [cookie , setCookie , removeCookie] = useCookies(["token"]);


   // fucntion to retrive email of all user type  
       async function retrieveEmail(){
         const response = await makeAuthenticatedGETRequest("/getAllUserEmail" , cookie.token);
         if(response && response.success){
            setUserEmail(response.allUserEmail);
         }
         else{
            alert(response.message);
         }
         
      }

   

      // this function is for get own task
      async function getOwnTask(){
         const response = await makeAuthenticatedGETRequest("/getAllOwnTask", cookie.token);
         if(response && response.success){
             setAllOwnTask(response.data);
             
         }
         else{
             alert(response.message);
         }
     }
   
     


    


  
    const value ={
 
 cookie,
 setCookie,
 removeCookie,
 retrieveEmail,
 userEmail,
 setUserEmail,
 allOwnTask,
 setAllOwnTask,
 getOwnTask,
 userType , 
 setUserType,
 updateTask,
 setUpdateTask

    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}