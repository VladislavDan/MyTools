import {ICallback} from "../react-types/ICallback";

export const CallbackFactory = <S>(settings: S) => <A>(callback: ICallback<S, A>) => {
    return (args?: A) => callback(settings, args)
}