import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCoffee = () => {
  const navigate = useNavigate();
  const handleAddCoffee = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const quantity = form.get('quantity');
    const supplier = form.get('supplier');
    const test = form.get('test');
    const category = form.get('category');
    const details = form.get('details');
    const photo = form.get('photo');
    const newCoffee = {
      name,
      quantity,
      supplier,
      test,
      category,
      details,
      photo,
    };
    console.log(newCoffee);
    fetch('https://coffee-store-server-bnor88gbc-ruma1.vercel.app/coffee', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newCoffee),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'success',
            text: 'Coffee added successfully',
            icon: 'success',
            showConfirmButton: true,
          });
          e.target.reset();
          navigate('/');
        }
      });
  };
  return (
    <div>
      <h3 className="text-3xl text-gray-700">Add Coffee</h3>
      <form
        onSubmit={handleAddCoffee}
        className="w-11/12 mx-auto bg-orange-200 p-5 space-y-4"
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">
              Coffee Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Coffee Name"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">
              Available Quantity
            </label>
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">Supplier</label>
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">Test</label>
            <input
              type="text"
              name="test"
              placeholder="Test"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-xl font-semibold text-left">Details</label>
            <input
              type="text"
              name="details"
              placeholder="Details"
              className="w-full rounded-lg border-2 px-4 py-2"
            />
          </div>
        </div>
        <div className="w-full mx-auto">
          <label className="text-xl font-semibold ">Photo</label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="w-full rounded-lg border-2 px-4 py-2"
          />
        </div>
        <input
          className="btn btn-primary w-full"
          type="submit"
          value="Add Coffee"
        />
      </form>
    </div>
  );
};

export default AddCoffee;
