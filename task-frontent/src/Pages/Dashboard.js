import { useContext, useState } from "react";
import Task from "../Components/Task";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { AppContext } from "../Context/AppContext";
import TaskDesign from "../Components/TaskDesign";
import Dash from "../Components/Dash";

function Dashboard() {
  const { cookie } = useContext(AppContext);
  let [filterDetails, setFilterDetails] = useState([]);

 let [formData , setFormData] = useState("All");


  //  ! for submit button
  async function submitHandler(event) {
    event.preventDefault();

    if (formData === "All") {
      const response = await makeAuthenticatedGETRequest(
        "/getAllTask",
        cookie.token
      );
      if (!response.success) {
        alert(response.message);
      } else {
        setFilterDetails(response.allTask);
      }
    } else if (formData === "Pending") {
      const response = await makeAuthenticatedGETRequest(
        "/getAllPendingTask",
        cookie.token
      );
      if (!response.success) {
        alert(response.message);
      } else {
        setFilterDetails(response.allTask);
      }
    } else {
      const response = await makeAuthenticatedGETRequest(
        "/getAllCompleteTask",
        cookie.token
      );
      if (!response.success) {
        alert(response.message);
      } else {
        setFilterDetails(response.allTask);
      }
    }
  }

  return (
    <Task>
      <div className="w-full h-full pl-10">
        <label htmlFor="statusFilter" className="text-3xl font-semibold">
          Filter by Status:
        </label>
        <select
          required
          id="statusFilter"
          name="statusFilter"
          onChange={(event)=>setFormData(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={submitHandler}
          className="bg-blue-400 px-10 py-4 font-semibold rounded-full mt-7"
        >
          Submit
        </button>
        <div className="flex flex-col gap-3 mt-3">
          {filterDetails !== undefined
            ? filterDetails.map((task) => (
                <TaskDesign
                  key={task._id}
                  Status={task.status}
                  description={task.description}
                  dueDate={task.dueDate}
                  title={task.title}
                  id={task._id}
                />
              ))
            : ""}
        </div>
        {
         filterDetails !== undefined?(
            <Dash tasks={filterDetails} />
         ):( '' )
        }
      </div>
    </Task>
  );
}

export default Dashboard;
