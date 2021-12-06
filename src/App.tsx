import React from 'react';
import './App.css';
import DropDown from './components/DropDown';
import 'antd/dist/antd.css';

const generateOptions = (num: number): string[] => {
    const ret = [];
    for (let i = 0; i < num; i++) {
        ret.push(i.toString());
    }

    return ret;
};

function App() {
    return (
        <div className="App">
            <div>
                Single Selector
                <DropDown initialOptions={generateOptions(15)} mode={'single'} onChange={(vs) => console.log(vs)} />
            </div>

            <div>
                Multi tag selector
                <DropDown initialOptions={generateOptions(15)} mode={'multiple'} onChange={(vs) => console.log(vs)} />
            </div>

            <div>
                Allow Clear
                <DropDown
                    allowClear={true}
                    initialOptions={generateOptions(15)}
                    mode={'multiple'}
                    onChange={(vs) => console.log(vs)}
                />
            </div>

            <div>
                Allow Select all
                <DropDown
                    allowSelectAll={true}
                    initialOptions={generateOptions(15)}
                    mode={'multiple'}
                    onChange={(vs) => console.log(vs)}
                />
            </div>

            <div>
                Stress Test (10000 entries)
                <DropDown
                    allowClear={true}
                    initialOptions={generateOptions(10000)}
                    mode={'multiple'}
                    onChange={(vs) => console.log(vs)}
                />
            </div>
        </div>
    );
}

export default App;
