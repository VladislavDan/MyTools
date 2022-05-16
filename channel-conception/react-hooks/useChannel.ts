import {useEffect, useRef} from 'react';
import {Subscription} from 'rxjs';

import {Channel} from '../Channel';

export const useChannel = <A, D>(
    channel: Channel<A, D>,
    next?: (value: D) => void,
    additionalErrorHandler?: (error: Error) => void,
    deepEqual = true
) => {

    const value = useRef<{ subscription: Subscription | null }>({
        subscription: null
    });

    if (!value.current.subscription || value.current.subscription.closed) {
        const subscription = channel.subscribe(next, additionalErrorHandler, deepEqual);
        value.current.subscription = subscription;
    }

    useEffect(() => {
        return () => {
            channel.unsubscribe();
        }
    }, [channel]);
};
