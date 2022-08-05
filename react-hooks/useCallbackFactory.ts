import {useHistory, useLocation} from "react-router";
import {Context, useContext, useState} from "react";
import {useUnsubscribe} from "./useUnsubscribe";
import {ICallbackSettings} from "./types/ICallbackSettings";
import {CallbackFactory} from "../react-utils/CallbackFactory";

export const useCallbackFactory = <T extends ICallbackSettings<any, any, any, any>>(
    initialState: T["state"],
    services: T["services"],
    context: Context<T["context"]>
) => {
    const location = useLocation<T["location"]>();

    const history = useHistory<T["location"]>();

    const [state, setState] = useState<T["state"]>(initialState);

    const {setSubscription} = useUnsubscribe();

    const value = useContext<T["context"]>(context);

    const callbackSettings: ICallbackSettings<T["state"], T["services"], T["location"]["state"], T["context"]> = {
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