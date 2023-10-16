import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ViewCoffee = () => {
  const loadedCoffee = useLoaderData();
  const { name, test, supplier, details, photo, quantity } = loadedCoffee;
  console.log(loadedCoffee);
  return (
    <div>
      <h3 className="text-xl font-semibold">View coffee:{loadedCoffee.name}</h3>
      <h3 className="text-xl font-semibold">
        View Available Quantity:{loadedCoffee.quantity}
      </h3>
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
          {/* <div className=" justify-end">
            <div className="btn-group btn-group-vertical space-y-2">
              <Link to={`/viewCoffee/${_id}`}>
                <button className="btn  btn-primary">View</button>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewCoffee;
