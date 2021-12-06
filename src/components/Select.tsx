import type { ReactElement } from 'react';
import {useEffect, useRef, useState} from 'react';
import './style.css';
import { DropDownPanel } from './Option';
import { CloseCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

interface IProp {
    initialOptions: string[];
    allowClear?: boolean;
    allowSelectAll?: boolean;
    children?: ReactElement[] | null;
    mode: 'single' | 'multiple';
    onChange?: (v: string[]) => void;
}

const defaultProps: IProp = {
    initialOptions: [],
    children: null,
    allowClear: false,
    allowSelectAll: false,
    mode: 'multiple',
    onChange: undefined,
};

const Select = ({ initialOptions, allowClear, children, mode, onChange }: IProp): ReactElement => {
    const [selectedVals, setSelectedVals] = useState<string[]>([]);
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    const ref = useRef();

    const clearSelection = (): void => {
        console.log('on clear');
        setSelectedVals([]);
    };

    const checkIfClickedOutside = (e: MouseEvent) => {
        console.warn(e);
        // // @ts-ignore
        // if (isDropDownVisible && ref.current && !ref.current.contains(e.target)) {
        //     setIsDropDownVisible(false);
        // }
    };

    const onClickOption = (e: MouseEvent): void => {
        // @ts-ignore
        const x = e.target.value;
        const idx = selectedVals.indexOf(x);

        if (mode === 'multiple') {
            if (idx === -1) {
                selectedVals.push(x);
                const tmp = [...selectedVals];

                setSelectedVals([...tmp]);
            } else {
                selectedVals.splice(idx, 1);
                const tmp = [...selectedVals];
                setSelectedVals([...tmp]);
            }
        }

        if (mode === 'single') {
            if (idx === -1) {
                setSelectedVals([x]);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isDropDownVisible]);

    useEffect(() => {
        if (onChange) {
            onChange(selectedVals);
        }
    }, [selectedVals]);

    return (
        <div className="select_container">
            <div className="input_container">
                <input value={selectedVals} onClick={() => setIsDropDownVisible(!isDropDownVisible)} />
                <div>
                    {!isDropDownVisible && <DownCircleOutlined />}
                    {allowClear && isDropDownVisible && selectedVals.length !== 0 && (
                        <CloseCircleOutlined onClick={() => clearSelection()} />
                    )}
                </div>
            </div>

            {isDropDownVisible && (
                // @ts-ignore
                <div className="select_dropdown_panel" ref={ref}>
                    <DropDownPanel options={initialOptions} selectedOptions={selectedVals} onClick={onClickOption} />
                </div>
            )}

            {children}
        </div>
    );
};

Select.defaultProps = defaultProps;

export default Select;
