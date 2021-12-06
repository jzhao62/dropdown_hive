import type { ReactElement } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { DownCircleOutlined } from '@ant-design/icons';
import List from 'rc-virtual-list';

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

const DropDown = ({ initialOptions, allowClear, allowSelectAll, children, mode, onChange }: IProp): ReactElement => {
    const [selectedVals, setSelectedVals] = useState<string[]>([]);
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    const ref = useRef();

    const clearSelection = (): void => {
        console.log('on clear');
        setSelectedVals([]);
    };

    const checkIfClickedOutside = (e: MouseEvent) => {
        console.warn(e);
        // @ts-ignore
        if (isDropDownVisible && ref.current && !ref.current.contains(e.target)) {
            setIsDropDownVisible(false);
        }
    };

    const onClickOption = (e: any): void => {
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
            } else {
                setSelectedVals([]);
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

                {!isDropDownVisible && (
                    <div style={{ left: '-20px' }}>
                        <DownCircleOutlined />
                    </div>
                )}
            </div>

            {isDropDownVisible && (
                // @ts-ignore

                <div className="select_dropdown_panel" ref={ref}>
                    {allowClear && isDropDownVisible && selectedVals.length !== 0 && (
                        <a onClick={() => clearSelection()}>
                            <div className="option_font">CLEAR</div>
                        </a>
                    )}

                    {allowSelectAll && isDropDownVisible && (
                        <a onClick={() => setSelectedVals([...initialOptions])}>
                            <div className="option_font">SELECT ALL</div>
                        </a>
                    )}
                    <List data={initialOptions} height={200} itemHeight={30} itemKey="id">
                        {(value) => (
                            <div className={`option_wrapper ${selectedVals.includes(value) ? `selected` : ''}`}>
                                <button className="button_wrapper" onClick={(e) => onClickOption(e)} value={value}>
                                    {value}
                                </button>
                            </div>
                        )}
                    </List>
                </div>
            )}

            {children}
        </div>
    );
};

DropDown.defaultProps = defaultProps;

export default DropDown;
