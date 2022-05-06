import {useEffect, useRef} from 'react';
import {Subscription} from 'rxjs';

import {Channel} from '../Channel';
import {useConstructor} from "../../react-hooks/useConstructor";

export const useChannel = <A, D>(channel: Channel<A, D>, next?: (value: D) => void, additionalErrorHandler?: (error: Error) => void) => {

    const value = useRef<{ subscription: Subscription | null }>({
        subscription: null
    });

    useConstructor(() => {
        if (!value.current.subscription || value.current.subscription.closed) {
            const subscription = channel.subscribe(next, additionalErrorHandler);

            value.current.subscription = subscription;
        }
    })

    useEffect(() => {
        return () => {
            channel.unsubscribe();
        }
    }, []);
};
