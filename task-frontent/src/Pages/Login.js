import { useContext, useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";


function Login(){
    const {   setCookie  } = useContext(AppContext);

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        email:"",
        password:"",
       
    })

    function changeHandler(event){
        const {value , name} = event.target;
        setFormData((prev)=>{
            return {
                ...prev ,
                [name]:value
            }
        })
    }


   async function submitHandler(event){
        event.preventDefault();
       const response = await makeUnauthenticatedPOSTRequest("/login" , formData);
      
       if(response && response.success){
         const token = response.token;
         const date = new Date();
         date.setDate(date.getDate() +30);

         setCookie('token', token,{
            path:"/",
            expires:date,
         })

        navigate("/");

     sessionStorage.setItem('userType', response.type);
        
       }
       else{
        alert(response.message);
       }
    }

    return (
        <div className="signup w-full h-screen bg-cover bg-center flex justify-center items-center ">
            
           <form className="w-[330px] h-[400px] form flex flex-col justify-evenly " onSubmit={submitHandler}>
                <h1 className="font-bold text-3xl text-center mt-3">LOGIN FORM</h1>
                {/* input  */}
                <div className="flex flex-col ">
                
                 <input onChange={changeHandler} required type="email" name="email" className="mx-auto" placeholder="Enter your email"  />
                 <input onChange={changeHandler} required type="password" name="password" className="mx-auto" placeholder="Enter Password"  />

                
                </div>
                <button className="bg-blue-500 w-[60%] py-2 mx-auto rounded-full mt-3 hover:bg-blue-600 font-semibold text-lg duration-200 text-white">Submit</button>

         <Link to="/signup"> <p className="font-semibold text-center">don't have an account <span className="text-blue-400 hover:underline ">signup</span> </p> </Link>
         </form >


        </div>
    )
}

export default Login;