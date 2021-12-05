import type { ReactElement } from 'react';

interface IProp {
    value: number;
    disable?: boolean;
    children: string;
}
const Option = ({ value, disable = false, children }: IProp): ReactElement => {
    console.log(value, disable);
    return <div>{children}</div>;
};

export default Option;
