import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

interface IProp {
    initialOptions: number[];
    allowClear?: boolean;
    children: ReactElement[] | null;
}

const defaultProps: IProp = {
    initialOptions: [],
    children: null,
    allowClear: false,
};

const Select = ({ initialOptions, allowClear, children }: IProp): ReactElement => {
    const [selectedVals, setSelectedVals] = useState<string[]>([]);

    console.warn(allowClear, setSelectedVals);

    const onClickOption = (v: any): void => {
        const x = v.target.value;

        const idx = selectedVals.indexOf(x);

        if (idx === -1) {
            selectedVals.push(x);
            const tmp = [...selectedVals];

            setSelectedVals([...tmp]);
        } else {
            selectedVals.splice(idx, 1);
            const tmp = [...selectedVals];
            setSelectedVals([...tmp]);
        }
    };

    useEffect(() => {
        console.log(selectedVals);
    }, [selectedVals]);

    return (
        <div>
            <input type="search" value={selectedVals} />

            <div>
                {initialOptions.map((value) => (
                    <div>
                        <button onClick={onClickOption} value={value}>
                            {value}
                        </button>
                    </div>
                ))}
            </div>

            {children}
        </div>
    );
};

Select.defaultProps = defaultProps;

export default Select;
