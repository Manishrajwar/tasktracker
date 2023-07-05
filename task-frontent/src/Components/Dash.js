import React from 'react';
import Dashboard from '../Components/Dashboard';


const Dash = ({tasks}) => {
   
  return (
    <div className='w-full h-full '>
      <Dashboard tasks={tasks} />
    </div>
  );
};

export default Dash;
