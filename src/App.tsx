import React, {useState} from 'react';
import {Select, SelectOption} from './Select';

const options = [
  {label: 'First', value: 1},
  {label: 'Second', value: 2},
  {label: 'Third', value: 3},
  {label: 'Fourth', value: 4},
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);

  return (
      <Select onChange={(option) => setValue(option)} options={options}
              value={value}/>
  );
}

export default App;
