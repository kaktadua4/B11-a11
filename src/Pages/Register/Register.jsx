import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';  // Fixed import
import { AuthContext } from '../../Context/AuthContext';
import auth from '../../firebase/firebase.init';
import axios from 'axios';  // Add this

const Register = () => {
  const { signInWithGoogle, createUser } = useContext(AuthContext);  // Use context properly
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';  // Safer access

  console.log('location in register page', location);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user);
        // Store user in MongoDB (if not exists)
        const userData = {
          name: result.user.displayName || 'Google User',  // Use Google displayName
          photoUrl: result.user.photoURL || '',  // Google photo
          email: result.user.email,
          firebaseUid: result.user.uid, // Key for linking
          password :result.user.password 
        };
        axios.post('http://localhost:3000/user', userData)
          .then(() => {
            console.log('User stored in DB');
          })
          .catch(err => {
            if (err.response?.status === 400) {
              console.log('User already exists in DB – proceeding');
            } else {
              console.error('Error storing user:', err);
            }
          });
        navigate(from);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photoUrl, email, password);
    form.reset();

    // Create user in Firebase
    createUser( auth ,email, password)  // Assuming createUser takes email, password (no auth param needed if wrapped)
      .then(result => {
        console.log(result.user);
        // Store user in MongoDB (omit password)
        const userData = {
          name,
          photoUrl,
          email,
          password,
          firebaseUid: result.user.uid  // Key for linking
        };
        axios.post('http://localhost:3000/user', userData)
          .then(() => {
            console.log('User stored in DB');
            navigate(from);
          })
          .catch(err => {
            if (err.response?.status === 400) {
              console.log('User already exists in DB – proceeding');
              navigate(from);
            } else {
              console.error('Error storing user:', err);
            }
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <main className='text-[#1c8097] '>
      <div className='flex justify-center items-center h-screen flex-col'>
        <div className='mb-8 flex flex-col justify-center items-center gap-4'>
          <h2 className='text-3xl font-bold'>Register</h2>
          <h3 className='text-center '>Please Register to get started</h3>
        </div>
        <div className='flex-col border mx-2 border-[#104956] rounded-lg shadow-lg shadow-2xl flex w-11/12 md:w-2/5 '>
          <div className="w-full ">
            <form onSubmit={handleRegister}>
              <fieldset className="flex flex-col gap-6 p-6">
                <label className="label font-bold">Name</label>
                <input name='name' type="text" className="border border-[#1c8097] rounded-lg p-2" placeholder="Name" />
                <label className="label font-bold">Photo URL</label>
                <input name='photoUrl' type="url" className="border border-[#1c8097] rounded-lg p-2" placeholder="Photo URL" />
                <label className="label font-bold">Email</label>
                <input name='email' type="email" className="border border-[#1c8097] rounded-lg p-2" placeholder="Email" required />
                <label className="label font-bold">Password</label>
                <input name='password' type="password" className="border border-[#1c8097] rounded-lg p-2" placeholder="Password" required />
                <button className="border-2 border-[#104956] rounded-lg p-2 bg-[#1c8097] text-white w-full mt-4" type='submit'>Register</button>
                <button onClick={handleGoogleSignIn} className="border-2 p-1 gap-4 flex justify-center items-center border-[#104956] rounded-lg w-full mt-4">
                  <img className='w-8' src="/google.png" alt="" />
                  <p>Sign in with Google</p>
                </button>
                <p className='text-center '>Already have an account? <NavLink className='text-blue-500 underline mx-6' to='/login'>Login</NavLink></p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;