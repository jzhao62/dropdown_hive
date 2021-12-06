import React from 'react';
import './App.css';
import Select from './components/Select';
import 'antd/dist/antd.css';

const generateOptions = (): string[] => {
    const ret = [];
    for (let i = 0; i < 100; i++) {
        ret.push(i.toString());
    }

    return ret;
};
function App() {
    const initOptions = generateOptions();
    return (
        <div className="App">
            {'single'}
            <Select initialOptions={initOptions} mode={'single'} onChange={(vs) => console.log(vs)} />
            {'multiple'}
            <Select initialOptions={initOptions} mode={'multiple'} onChange={(vs) => console.log(vs)} />
            <Select
                allowClear={true}
                initialOptions={initOptions}
                mode={'multiple'}
                onChange={(vs) => console.log(vs)}
            />
        </div>
    );
}

export default App;
