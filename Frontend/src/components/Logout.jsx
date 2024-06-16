import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider.jsx"


function Logout() {
    const [authUser,setAuthUser]=useAuth();
    const handleLogout=()=>{
        try {
            setAuthUser({
                ...authUser,
                user:null,                  //jo localstorage mein user hai usko null kardenge whi se na pta chal rha hai na ki user authenticated hai ki nhi
            });
            localStorage.removeItem("Users");
            toast.success("Log out successfull");
            setTimeout(()=>{
              window.location.reload();
              },1000)
        } catch (error) {
            toast.error("Error: "+error.message);
            setTimeout(()=>{},1000)
        }
    }



  return (
    <div>
        <button className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
        >Logout</button>
      
    </div>
  )
}

export default Logout
