import type { ReactElement } from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface IProp {
    height: number;
    children: ReactElement;
}
const Wrapper = ({ height, children }: IProp): ReactElement | null => {
    const { ref, inView, entry } = useInView();

    const style = {
        height: `${height}px`,
    };

    console.warn(inView, entry);

    // if (!inView && entry) {
    //     console.log(!inView, entry);
    //     return null;
    // }

    if(!inView){
        return <div>GG</div>
    }

    return (
        <div style={style} ref={ref}>
            {inView && children}
        </div>
    );
};

export { Wrapper };
