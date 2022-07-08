import {Subscription} from "rxjs";
import * as H from 'history';

export interface ICallbackSettings<S, P, NS, CX> {
    setSubscription: (subscription: Subscription) => void;
    location: H.Location<NS>;
    history: H.History<NS>;
    state: S;
    setState: (callback: (arg: S) => S) => void;
    services: P;
    context: CX;
}