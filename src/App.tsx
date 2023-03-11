import React from 'react';
import {Select} from "./Select";

const options = [
  {label: "First", value: 1},
  {label: "Second", value: 2},
  {label: "Third", value: 3},
  {label: "Fourth", value: 3},
]

function App() {
  const onChange = () => {
  };

  return (
    <Select onChange={onChange} options={options}/>
  );
}

export default App
