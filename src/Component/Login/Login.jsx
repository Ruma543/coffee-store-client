import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    const newLogUser = { email, password };
    console.log(newLogUser);
    loginUser(email, password)
      .then(result => {
        console.log(result.user);
        const user = {
          email,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        console.log(user);
        fetch('http://localhost:5000/user', {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data) {
              e.target.reset();
              Swal.fire({
                title: 'success',
                text: 'user login successfully',
                icon: 'success',
                showConfirmButton: true,
              });
              navigate('/user');
            }
          });
      })
      .catch(error => {
        Swal.fire({
          title: 'error',
          text: 'something wrong',
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p>
            New for website? Please{' '}
            <Link className="text-blue-600" to="/registration">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
