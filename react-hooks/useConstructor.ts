import {useRef} from 'react';

export const useConstructor = (callback: () => void) => {

    const value = useRef({isFirstRun: true});

    if (value.current.isFirstRun) {
        callback();
        value.current.isFirstRun = false;
    }
};
