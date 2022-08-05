export type ICallback<S, A> = (settings: Pick<S, Exclude<keyof S, 'state'>>, args?: A) => void

export const CallbackFactory = <S>(settings: S) => <A>(callback: ICallback<S, A>) => {
    return (args?: A) => callback(settings, args)
}