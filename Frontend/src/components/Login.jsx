import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    const userInfo={
      emailId:data.emailId,
      password:data.password
    }
    await axios.post('https://book-nest-api.vercel.app/login',userInfo)   //is url mein humko userInfo store karwana hai
    .then((res)=>{
        console.log(res.data);
        if(res.data){
          toast.success('Login successfull');
          setTimeout(()=>{
            document.getElementById("my_modal_3").close();
          window.location.reload();
          localStorage.setItem("Users",JSON.stringify(res.data.user));                         //kyunki hum chahte hai courses wala section sirf authenticated log dekh paaye to local storage mein store.
          },1000)

        }
        
    }).catch((err)=>{
       if(err.response){
        console.log(err);
        toast.error("Error : "+err.response.data.message);
        setTimeout(()=>{},1000)

       }
    })
  };
  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box dark:bg-slate-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </Link>
              <h3 className="font-bold text-lg">Login</h3>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 rounded-md outline-none"
                  {...register("emailId", { required: true })}
                />
                <br />
                {errors.emailId && <span className="text-sm text-red-500">This field is required</span>}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 rounded-md outline-none dark:bg-slate-800 dark:text-white"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && <span className="text-sm text-red-500">This field is required</span>}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4 ">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1">
                  {" "}
                  Login
                </button>
                <p>
                  Not registered?{" "}
                  <Link
                    to="/signup"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;
