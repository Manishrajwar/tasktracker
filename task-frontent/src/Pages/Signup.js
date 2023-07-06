import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Signup(){

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        email:"",
        password:"",
        name:"",
        type:""
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
           const response = await makeUnauthenticatedPOSTRequest('/signup' , formData);
         if(response && response.success){
 navigate("/login");

         }
         else{
alert(response.message);
         }
    }

    return (
        <div className="signup w-full h-screen bg-cover bg-center flex justify-center items-center">
            
           <form className="w-[330px] h-[430px] form flex flex-col " onSubmit={submitHandler}>
                <h1 className="font-bold text-3xl text-center mt-3">SIGNUP FORM</h1>
                {/* input  */}
                <div className="flex flex-col  ">
                 <input onChange={changeHandler} required type="text" name="name" className="mx-auto" placeholder="Enter your name"  />
                 <input onChange={changeHandler} required type="email" name="email" className="mx-auto" placeholder="Enter your email"  />
                 <input onChange={changeHandler} required type="password" name="password" className="mx-auto" placeholder="create Password"  />

                 <select onChange={changeHandler} required name="type" id="" className="mx-auto" >
                 <option disabled selected value="">Select status </option>
 
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                 </select>
                </div>
                <button className="bg-blue-500 w-[60%] py-2 mx-auto rounded-full mt-3 hover:bg-blue-600 font-semibold text-lg duration-200 text-white">Submit</button>

         <Link to="/login"> <p className="font-semibold text-center mt-3">already have an account ! <span className="text-blue-400 hover:underline">login</span> </p> </Link>
         </form >


        </div>
    )
}

export default Signup;