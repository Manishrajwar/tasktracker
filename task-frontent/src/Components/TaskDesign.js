import { IoCheckmarkDone } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedUPDATERequest,
} from "../utils/serverHelper";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function TaskDesign({ Status, dueDate, description, title, id }) {
  const { cookie } = useContext(AppContext);

  const formData = {
    status: "",
    taskId: "",
  };

  dueDate = dueDate.slice(0, 10);

  async function doneHandler() {
    const response = await makeAuthenticatedUPDATERequest(
      "/update/task",
      formData,
      cookie.token
    );
    if (!response.success) {
      alert(response.message);
    }
  }

  async function deleteHandler(id) {
    await makeAuthenticatedDELETERequest(`/delete/task/${id}`, cookie.token);
  }
  return (
    <div className="w-full h-full  items-center task-container gap-4 pl-2">
      <div className="bg-black w-[90%]  max-h-full rounded-xl text-white pl-4 flex gap-6 items-center task-left">
        <div className="flex task-content gap-10 w-[90%]  h-[90%]">
          <div className=" task-title">
            <p className="text-blue-400 font-semibold ">Title</p>
            {title}
          </div>
          <div className=" task-description overflow-y-scroll">
            <p className="text-blue-400 font-semibold">description</p>
            <p>{description}</p>
          </div>
        </div>

        <div className="flex task-status flex-col   text-right ">
          <div>
            <p className="cursor-pointer"> {dueDate}</p>
          </div>
          <p
            className={`cursor-pointer pr-4 ${
              Status === `Pending` ? "text-red-400" : "text-green-400"
            } `}
          >
            {Status}
          </p>
        </div>
      </div>

      {/* this div is for button */}
      <div className="task-btn">
        {/* status button */}
        <button
          onClick={() => {
            if (Status === "Pending") {
              formData.status = "Completed";
              formData.taskId = id;
              doneHandler();
              window.location.reload();
            } else {
              formData.status = "Pending";
              formData.taskId = id;
              doneHandler();
              window.location.reload();
            }
          }}
          className={`font-bold  text-white p-1 bg-black  text-2xl rounded-3xl ${
            Status === `Pending` ? "hover:bg-green-400" : "bg-green-400"
          } duration-200`}
        >
          <span title="done">
            <IoCheckmarkDone />
          </span>
        </button>

        {/* delete button */}
        <button
          onClick={() => {
            deleteHandler(id);
            window.location.reload();
          }}
          className="font-bold  text-white p-1 bg-black  text-2xl rounded-3xl hover:bg-red-600 duration-200"
        >
          <span title="delete">
            <AiFillDelete />
          </span>
        </button>
      </div>
    </div>
  );
}

export default TaskDesign;
