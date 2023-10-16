import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  // console.log(coffee);
  const { _id, name, quantity, supplier, test, details, category, photo } =
    coffee;
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
          `https://coffee-store-server-bnor88gbc-ruma1.vercel.app/coffee/${_id}`,
          {
            method: 'DELETE',
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              const remaining = coffees.filter(coffee => coffee._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="card card-side bg-orange-100 shadow-xl grid grid-cols-2">
        <figure>
          <img src={photo} alt="Movie" />
        </figure>
        <div className=" flex  justify-between  items-center px-4">
          <div>
            <h2 className="card-title">{name}</h2>
            <p className="text-left">{test}</p>
            <p className="text-left">{supplier}</p>
            <p className="text-left">{details}</p>
          </div>
          <div className=" justify-end">
            <div className="btn-group btn-group-vertical space-y-2">
              <Link to={`/viewCoffee/${_id}`}>
                <button className="btn  btn-primary">Details</button>
              </Link>
              <Link to={`/updateCoffee/${_id}`}>
                <button className="btn btn-success">Update</button>
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
