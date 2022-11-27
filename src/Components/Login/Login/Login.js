import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const { signIn } = useContext(AuthContext);
    // const [loginUserEmail, setLoginUserEmail] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || "/";

    const handleLogin = data => {
        // console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // setLoginUserEmail(data.email);
                navigate(from, { replace: true });
                toast.success('Login successful')
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
        
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7 rounded-md shadow-primary shadow-lg max-w-full lg:max-w-md'>
                <h2 className='text-xl text-center'>Login</h2>
                {/* onSubmit={handleSubmit(handleLogin)} */}
                <form onSubmit={handleSubmit(handleLogin)} >
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-primary" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-primary" />
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary text-white w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600 my-2'>{loginError}</p>}
                    </div>
                </form>
                <p className='mt-2'>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                {/* <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}
            </div>
        </div>
    );
};

export default Login;