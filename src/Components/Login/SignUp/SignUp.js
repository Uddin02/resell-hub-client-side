import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';


const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, providerLogin  } = useContext(AuthContext);
    const [signUpError, setSignupError] = useState('');
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const handleSignUp = (data) => {
        console.log(data);
        setSignupError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('User Created Successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                    })

            })
            .catch(err => {
                console.error(err.message)
            })
            .catch(error => {
                console.log(error)
                setSignupError(error.message)
            });
    }

    const saveUser = (name, email, role) => {

        axios.post(`http://localhost:5000/users`, {
            name: name,
            email: email,
            role: role
        })
            .then(function (response) {
                console.log(response);
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const HandleGoogleSignIn = ({ name, email, role }) => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    email: user.email,
                    name: user.displayName,
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(name = user.displayName, email = user.email, role = "Buyer");
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignupError(error.message)
            });



    }

    return (
        <div className='h-[600px] flex justify-center items-center my-10'>
            <div className='w-96 p-7 rounded-md shadow-primary shadow-md max-w-full lg:max-w-md'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-primary" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email Address is required",
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ }
                        })} className="input input-bordered w-full max-w-xs focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-primary" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Account Type</span></label>
                        <select name="select" className="select select-bordered w-full max-w-xs"
                            {...register("role", {
                            })}>
                            <option defaultValue>Buyer</option>
                            <option>Seller</option>
                        </select>
                        {errors.select && <p className='text-red-500'>{errors.select.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full max-w-xs focus:outline-none focus:ring focus:ring-opacity-20 focus:ring-primary" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-primary w-full mt-4 mb-2 text-white' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary mt-5' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <div>
                    <button onClick={HandleGoogleSignIn} className='btn btn-primary btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;