import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Task({children}){
    return (
       <div className="w-full h-full ">
         <Navbar />
       
       <div className="w-full h-full flex">
          {/* left part */}
         <Sidebar />

         {/* right part  */}
         <div className="w-full ml-[14%] min-h-screen taskright signup h-full  flex flex-col items-center gap-3 overflow-y-scroll">
        {children}
      
          
         </div>
       </div>

       </div>
    )
}

export default Task;