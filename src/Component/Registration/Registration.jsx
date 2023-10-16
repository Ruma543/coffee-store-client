import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Registration = () => {
  const { createUser, user, profileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(createUser);
  const handleRegister = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const photo = form.get('photo');
    const newUser = { name, email, photo };
    console.log(newUser);
    createUser(email, password)
      .then(result => {
        // console.log(result.user);
        // const createdAt = result.user?.metadata?.createdAt;
        // const lastSignInTime = result.user?.metadata?.lastSignInTime;

        // console.log(createdAt);
        // const user = {
        //   email,
        //   name,
        //   createdAt: createdAt,
        //   photo,
        //   lastSignInTime,
        // };
        fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                title: 'success',
                text: 'User added successfully',
                icon: 'success',
                showConfirmButton: true,
              });
              e.target.reset();
              navigate('/user');
            }
          });
        profileUpdate(name, photo)
          .then(() => {
            // Swal.fire({
            //   title: 'success',
            //   text: 'User update successfully',
            //   icon: 'success',
            //   showConfirmButton: true,
            // });
          })
          .catch(error => {
            Swal.fire({
              title: 'error',
              text: 'something wrong',
              icon: 'error',
              showConfirmButton: true,
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Registration now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="photo URL"
                name="photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registration</button>
            </div>
          </form>
          <p>
            Already resister? Please
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
