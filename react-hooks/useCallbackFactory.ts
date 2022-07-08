import {useHistory, useLocation} from "react-router";
import {Context, useContext, useState} from "react";
import {useUnsubscribe} from "./useUnsubscribe";
import {ICallbackSettings} from "./types/ICallbackSettings";
import {CallbackFactory} from "../react-utils/CallbackFactory";

export const useCallbackFactory = <NS, CS, PS, CX>(
    initialState: CS,
    services: PS,
    context: Context<CX>
) => {
    const location = useLocation<NS>();

    const history = useHistory<NS>();

    const [state, setState] = useState<CS>(initialState);

    const {setSubscription} = useUnsubscribe();

    const value = useContext<CX>(context);

    const callbackSettings: ICallbackSettings<CS, PS, NS, CX> = {
        location,
        history,
        services,
        state,
        setState,
        context: value,
        setSubscription
    }

    return {
        callbackFactory: CallbackFactory(callbackSettings),
        callbackSettings
    };
}