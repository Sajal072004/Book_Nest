import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      emailId: data.emailId,
      password: data.password
    };

    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post('https://book-nest-api.vercel.app/signup', userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      if (response.data) {
        toast.success('Signup successful');
        navigate(from, { replace: true });
        localStorage.setItem("Users", JSON.stringify(response.data.user));
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + err.response.data.message);
      } else {
        console.error('Network Error:', err);
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="w-[600px] ">
          <div className="modal-box dark:bg-slate-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
              <h3 className="font-bold text-lg">Signup</h3>
              {/* Name */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 rounded-md outline-none dark:bg-slate-800 dark:text-white"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 rounded-md outline-none dark:bg-slate-800 dark:text-white"
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
                <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1"> Signup</button>
                <p className="text-xl">
                  Have Account? <button className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById('my_modal_3').showModal()
                    }
                  >Login</button>
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
