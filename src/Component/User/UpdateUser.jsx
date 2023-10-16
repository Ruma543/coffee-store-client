import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUser = () => {
  const updateUser = useLoaderData();
  const navigate = useNavigate();
  const { _id, email, name, photo } = updateUser;

  const handleUpdateUser = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const photo = form.get('photo');
    const newUser = { name, email, photo };
    // console.log(newUser);
    fetch(`http://localhost:5000/user/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'success',
            text: 'User update successfully',
            icon: 'success',
            showConfirmButton: true,
          });
          e.target.reset();
          navigate('/user');
        }
      });
  };
  return (
    <div>
      <h3 className="text-xl font-semibold">Update User: {updateUser.name}</h3>
      <form onSubmit={handleUpdateUser} className=" w-2/3 mx-auto card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            defaultValue={name}
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
            defaultValue={email}
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
            defaultValue={photo}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
