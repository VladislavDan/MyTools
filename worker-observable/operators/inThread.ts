import {Observable} from 'rxjs';

import {functionToThread} from "../logic/functionToThread";

export const inThread = <SA, TA, R>(argumentMapper: (arg: SA) => TA, workerFunction: (arg: TA) => R) => (source: Observable<SA>) => {

    const thread = functionToThread(workerFunction)

    return new Observable(observer => {

        return source.subscribe({
            next(arg) {
                thread.postMessage(argumentMapper(arg));
                thread.onmessage = (event: MessageEvent) => {
                    observer.next(event.data);
                }
            },
            error() {
                thread.onerror = (err) => {
                    observer.error(err);
                }
            },
            complete() {
                observer.complete();
                thread.terminate();
            }
        });
    });
}