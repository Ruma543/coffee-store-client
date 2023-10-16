import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';

const User = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);
  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-bnor88gbc-ruma1.vercel.app/user/${_id}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              const remaining = users.filter(coffee => coffee._id !== _id);
              setUsers(remaining);
            }
          });
      }
    });
  };
  // console.log(loadedUser);
  // console.log(loadedUser.email);
  return (
    <div>
      <h3 className="text-2xl font-semibold">All user: {users.length}</h3>
      <div>
        {/* {loadedUser.map(user => (
          <li key={user._id}>{ }{user.email}</li>
        ))} */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th> Last logged in</th>
                <th> action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map(user => (
                <tr key={user._id}>
                  <th></th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.lastSignInTime}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <MdDelete></MdDelete>
                    </button>

                    <Link to={`/update/${user._id}`}>
                      <button className="btn btn-ghost btn-xs">
                        <BiEditAlt></BiEditAlt>
                      </button>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
