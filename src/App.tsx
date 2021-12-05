import React from 'react';
import './App.css';
import Select from './components/Select';

function App() {
    return (
        <div className="App">
            <Select allowClear={true} initialOptions={[1, 2, 3, 4, 5]} />
        </div>
    );
}

export default App;
