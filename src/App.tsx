import React, {useState} from 'react';
import {Select, SelectOption} from './Select';

const options = [
  {label: 'First', value: 1},
  {label: 'Second', value: 2},
  {label: 'Third', value: 3},
  {label: 'Fourth', value: 4},
  {label: 'Fifth', value: 5},
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  return (
      <div>
        <Select onChange={(option) => setValue(option)}
                options={options}
                multiple={false}
                value={value}/>

        <br/><br/>
        <Select onChange={(option) => setValue2(option)}
                options={options}
                multiple={true}
                value={value2}/>
      </div>

  );
}

export default App;
