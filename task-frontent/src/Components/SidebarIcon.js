import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {  useNavigate } from "react-router-dom";

function SidebarIcon({ icon, text, }) {
  const {  removeCookie } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div  onClick={() => {
      if (text === "Logout") {
        removeCookie("token");
        sessionStorage.removeItem('userType');
        navigate("/login");

      } 
    }} className="flex gap-3 items-center cursor-pointer  hover:text-white duration-150">
      <p className={`font-bold  text-2xl cursor-pointer`}>{icon}</p>
      <p className={`text-lg font-semibold cursor-pointer hover:text-white duration-100 transition-all sidebaricontext opacity-0`}
       
      >
        
        {text}
      </p>
    </div>
  );
}

export default SidebarIcon;
