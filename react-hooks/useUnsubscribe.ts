import {useEffect, useRef} from 'react';
import {Subscription} from 'rxjs';

export const useUnsubscribe = () => {

    const subscriptions = useRef<Array<Subscription>>([]);

    useEffect(() => {
        return () => {
            subscriptions.current.forEach((subscription: Subscription) => {
                if( !subscription.closed ) {
                    subscription.unsubscribe();
                }
            });
            subscriptions.current = [];
        }
    }, []);

    return { setSubscription: (subscribtion: Subscription) => {
        subscriptions.current.push(subscribtion);
    }}
};
