import { Link } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";
import { BsListTask } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MdChangeCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Sidebar() {
   const userType = sessionStorage.getItem('userType');
   const {updateTask,setUpdateTask} = useContext(AppContext);

  return (
    <div className="w-[14%] h-[100vh] overflow-hidden fixed  bg-[#242526] pl-4 text-[#ccc] pt-[8rem] flex flex-col gap-14">
      {
      userType =="User"? (
        <Link to="/task">
          <SidebarIcon
            text={"Task"}
            icon={<BsListTask />}

          />
        </Link>
      ):(<Link to="/dashboard">
      <SidebarIcon
        text={"Dashboard"}
        icon={<RxDashboard />}

      />
    </Link>)
    }

      <Link to="/assignTask">
        <SidebarIcon
          text={"Assign Task"}
          icon={<MdAssignmentAdd />}

        />
      </Link>
      {
        updateTask.show &&
        
      <Link to="/updateTask">
        <SidebarIcon
          text={"Update Task"}
          icon={<MdChangeCircle />}
          
          />
      </Link>
        }

      {userType === "Admin" && (
        <Link to="/search">
          <SidebarIcon
            text={"Search"}
            icon={<AiOutlineSearch />}

          />
        </Link>
      )}

      <SidebarIcon
        text={"Logout"}
        icon={<IoMdLogOut />}

      />
    </div>
  );
}

export default Sidebar;
