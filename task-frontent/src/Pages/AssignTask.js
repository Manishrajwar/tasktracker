import { useContext, useEffect, useState } from "react";
import Task from "../Components/Task";
import {  makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
function AssignTask() {
  let {cookie , userEmail  , retrieveEmail} = useContext(AppContext); 
  const navigate = useNavigate();

 
    const [formData , setFormData] = useState({
        assignedUser:"",
        title:"",
        dueDate:"",
        description:""
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


  async  function submitHandler(event){
        event.preventDefault();
            const response = await makeAuthenticatedPOSTRequest("/create/task" , formData ,cookie.token ) ;
             if(response && response.success){
 navigate("/task");


             }
             else{
              alert(response.message);
             }
    }

    useEffect(()=>{
   retrieveEmail();
   
    },[])

  return (
    <Task>
      <form onSubmit={submitHandler} className="w-[70%] assign-container h-[90%] pt-[7%] overflow-hidden flex flex-col gap-10   ">
        <div className="flex gap-10 assign-input">
          <select value={formData.assignedUser} onChange={changeHandler} required name="assignedUser" >
            <option disabled selected value="">
              Select whome to assign
            </option> 
          {
            userEmail.map((user ,index)=><option key={index} value={`${user.email}`} className="text-black">{user.email}</option>  )
          }
    
          </select>
          <input
          onChange={changeHandler}
          required
            type="text"
            name="title"
             value={formData.title}
            placeholder="Enter title"
            className="font-semibold text-xl "
          />
          <input
          onChange={changeHandler}
          required
          type="date"
          value={formData.dueDate}
            name="dueDate"
        
            placeholder="select DueDate"
            className="font-semibold text-xl  "
          />
        </div>

        <textarea value={formData.description} onChange={changeHandler}  required name="description" id="description" cols="10" rows="10" placeholder="Enter the description" className=" resize-none bg-transparent border-2 border-black text-2xl font-semibold"></textarea>

        <button  className="bg-blue-500  mx-auto px-10 py-4 rounded-full font-bold  text-black hover:bg-blue-600 duration-200">Assign</button>
      </form>
    </Task>
  );
}

export default AssignTask;
