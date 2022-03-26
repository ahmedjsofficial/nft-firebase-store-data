import React from 'react';
import Form from './components/Form.jsx';
import ShowData from './components/ShowData.jsx';

const App = () => {
  return (
    <>
        <div className="container border border-black">
            <Form />
            <ShowData />
        </div>
    </>
  );
};

export default App;