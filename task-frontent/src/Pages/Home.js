import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Home({children}){
    return (
       <div className="w-full h-[90%]">
         <Navbar />
       
       <div className="w-full h-full flex">
          {/* left part */}
         <Sidebar />

         {/* right part  */}
         <div className="w-full ml-[14%] max-h-full h-screen flex justify-center items-center signup flex-col gap-3 overflow-scroll">
           {children}
         </div>
       </div>

       </div>
    )
}

export default Home;