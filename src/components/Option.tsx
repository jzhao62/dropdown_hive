import type { ReactElement } from 'react';
import React from 'react';
import { Wrapper } from './Wrapper';
// import { useInView } from 'react-intersection-observer';

interface IDropDownPanel {
    options: string[];
    selectedOptions: string[];
    onClick: (e: any) => void;
}

// interface IOption {
//     height: number;
//     selectedOptions: string[];
//     value: string;
//     onClick: (e: any) => void;
// }
// const Option = ({ height, selectedOptions, value, onClick }: IOption): ReactElement | null => {
//
//     const style = {
//         height: `${height}px`,
//     };
//
//     return (
//         <div style={style}>
//             <div className={`option_wrapper ${selectedOptions.includes(value) ? `selected` : ''}`} ref={ref}>
//                 <button className="button_wrapper" onClick={onClick} value={value}>
//                     {value}
//                 </button>
//             </div>
//         </div>
//     );
// };

const DropDownPanel = ({ options = [], selectedOptions = [], onClick }: IDropDownPanel): ReactElement => {
    return (
        <>
            {options.map((value) => (
                <Wrapper height={30}>
                    <div className={`option_wrapper ${selectedOptions.includes(value) ? `selected` : ''}`}>
                        <button className="button_wrapper" onClick={onClick} value={value}>
                            {value}
                        </button>
                    </div>
                </Wrapper>
            ))}
        </>
    );
};

export { DropDownPanel };
