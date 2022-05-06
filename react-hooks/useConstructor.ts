import {useRef} from 'react';

export const useConstructor = (callback: () => void) => {

    const value = useRef({isFirstRun: false});

    if (!value.current.isFirstRun) {
        callback();
        value.current.isFirstRun = true;
    }
};
