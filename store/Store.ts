import {Observable, of, Subject, Subscription} from "rxjs";
import {IOutputSubject} from "./types/IOutputSubject";
import {ISelector} from "./types/ISelector";
import {IChanger} from "./types/IChanger";
import {IMessage} from "./types/IMessage";
import {IStore} from "./types/IStore";

export class Store<S extends IStore> {

    private oldStore: S = {} as S;
    private newStore: S = {} as S;
    private outputSubjects: Array<IOutputSubject<S, any>> = [];
    private observablesMap: Map<string, Observable<void>> = new Map();

    constructor() {
    }

    next<T>(message: IMessage<T>) {
        const observable = this.observablesMap.get(message.key)
        if (observable) {
            observable.subscribe()
        }
    }

    addObservable(key: string, observable: Observable<any>) {
        this.observablesMap.set(key, observable);
    }

    get<O>(selector: ISelector<S, O>): Observable<O> {
        return of(selector(this.newStore))
    }

    set(changer: IChanger<S>): void {
        const updatedStore = changer(this.newStore)
        this.updateStore(updatedStore)
    }

    private updateStore(store: S) {
        this.oldStore = this.newStore
        this.newStore = this.oldStore
        this.outputSubjects = this.outputSubjects.filter(({outputSubject}) => {
            return !outputSubject.closed
        })
        this.outputSubjects.forEach(({selector, outputSubject}) => {
            const stateFromOldStore = selector(this.oldStore)
            const stateFromNewStore = selector(this.newStore)

            if (stateFromNewStore !== stateFromOldStore) {
                outputSubject.next(stateFromNewStore);
            }
        })
    }

    subscribe<O>(
        selector: ISelector<S, O>,
        next?: (data: O) => void,
        errorHandler?: (error: Error) => void
    ): Subscription {

        const outputSubject = new Subject<O>()

        return outputSubject.subscribe(
            (data: O) => {
                if (next) {
                    next(data)
                }
            },
            (error: Error) => {
                if (errorHandler) {
                    errorHandler(error)
                }
            }
        );
    }
}