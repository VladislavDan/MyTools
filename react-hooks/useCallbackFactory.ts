import {useHistory, useLocation} from 'react-router';
import {Context, useContext, useState} from 'react';
import {useUnsubscribe} from './useUnsubscribe';
import {ICallbackSettings} from '../react-types/ICallbackSettings';
import {CallbackFactory} from '../react-callback-factory/CallbackFactory';

export const useCallbackFactory = <T extends ICallbackSettings<any, any, any, any>>(
    initialState: T['state'],
    services: T['services'],
    context: Context<T['context']>
) => {
    const location = useLocation<T['location']>();

    const history = useHistory<T['location']>();

    const [state, setState] = useState<T["state"]>(initialState);

    const {setSubscription} = useUnsubscribe();

    const value = useContext<T["context"]>(context);

    const callbackSettings: ICallbackSettings<T['state'], T['services'], T['location']['state'], T['context']> = {
        location,
        history,
        services,
        state,
        setState,
        context: value,
        setSubscription
    }

    const externalCallbackSettings = callbackSettings as Pick<ICallbackSettings<T['state'], T['services'], T['location']['state'], T['context']>,
        Exclude<keyof ICallbackSettings<T['state'], T['services'], T['location']['state'], T['context']>, 'services'>>

    return {
        callbackFactory: CallbackFactory(callbackSettings),
        externalCallbackSettings
    };
}