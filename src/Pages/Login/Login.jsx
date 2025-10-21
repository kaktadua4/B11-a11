import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';


const Login = () => {

    const { LoginUser } = use(AuthContext);


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        form.reset();

        LoginUser(email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
            });


    }

    return (
        <main className='text-[#1c8097] '>
            <div className='flex  justify-center items-center h-screen flex-col'>
                <div className='mb-8 flex flex-col justify-center items-center gap-4'>
                    <h2 className='text-3xl font-bold'>Login</h2>
                    <h3 className='text-center '>Please Login to continue</h3>
                </div>
                <div className='flex-col border mx-2 border-[#104956] rounded-lg shadow-lg shadow-2xl  flex w-11/12 md:w-2/5 '>
                    <div className="w-full ">
                        <form onSubmit={handleRegister} >
                            <fieldset className="flex flex-col gap-6 p-6">
                                <label className="label font-bold">Email
                                </label>
                                <input name='email' type="email" className="border border-[#1c8097] rounded-lg p-2" placeholder="Email" />
                                <label className="label font-bold">Password
                                </label>
                                <input name='password' type="password" className="border border-[#1c8097] rounded-lg p-2" placeholder="Password" />
                                <button className="border-2 border-[#104956] rounded-lg p-2 bg-[#1c8097] text-white w-full mt-4" type='submit'>Login</button>
                                <button className="border-2 flex justify-center items-center border-[#104956] rounded-lg w-full mt-4">
                                    <img className='w-8' src="/google.png" alt="" />
                                    <p>Login with Google</p>
                                </button>
                                <p className='text-center '>Dont have a account ? <NavLink className='text-blue-500 underline mx-6' to='/register'>Register</NavLink></p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;