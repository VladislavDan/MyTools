export type ICallback<S, A> = (settings: S, args?: A) => void

export const CallbackFactory = <S>(settings: S) => <A>(callback: ICallback<S, A>) => {
    return (args?: A) => callback(settings, args)
}