import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useLoaderData } from 'react-router-dom';
import CoffeeCard from './Component/CoffeeCard';

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);
  console.log(loadedCoffees);
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">
        Coffee Store:{coffees.length}
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {coffees.map(coffee => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          ></CoffeeCard>
        ))}
      </div>
    </>
  );
}

export default App;
