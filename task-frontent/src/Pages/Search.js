import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { AppContext } from "../Context/AppContext";
import TaskDesign from "../Components/TaskDesign";
import Dash from "../Components/Dash";

function Search() {
  const { cookie } = useContext(AppContext);

  let [formData, setFormData] = useState({
    email: "",
  });

  const [userData, setUserData] = useState([]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    const response = await makeAuthenticatedGETRequest(
      `/getTaskByUserEmail/${formData.email}`,
      cookie.token
    );
    if (!response.success) {
      alert(response.message);
    } else {
      setUserData(response.data);
    }
  }

  return (
    <div className="w-full h-[90%]">
      <Navbar />

      <div className="w-full h-full flex">
        {/* left part */}
        <Sidebar />

        {/* right part  */}
        <div className="w-full  min-h-screen pl-[10%]  pt-[7%] signup h-full flex flex-col gap-10 overflow-y-scroll">
          <form
            onSubmit={submitHandler}
            className=" flex flex-col items-center "
          >
            <input
              required
              type="email"
              onChange={changeHandler}
              value={formData.email}
              name="email"
              placeholder="Search with User Email"
              className="text-black font-semibold text-2xl"
            />
            <button className="bg-blue-400  py-4 px-10 text-center font-semibold  rounded-full mt-3 ">
              Submit
            </button>
          </form>
          {/* down part */}
          <div className=" h-full w-full pl-[10%] flex flex-col gap-10 overflow-y-scroll">
            {userData !== undefined
              ? userData.map((data) => (
                  <TaskDesign key={data._id}
                    Status={data.status}
                    dueDate={data.dueDate}
                    description={data.description}
                    title={data.title}
                    id={data._id}
                  />
                ))
              : ""}
          </div>
          {
         userData !== undefined?(
            <Dash tasks={userData} />
         ):( '' )
        }
        </div>
      </div>
    </div>
  );
}

export default Search;
