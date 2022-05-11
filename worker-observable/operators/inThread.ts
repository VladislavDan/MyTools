import {Observable} from 'rxjs';

import {functionToThread} from "../logic/functionToThread";

const inThread = <A, R>(workerFunction: (arg: A) => R) => (source: Observable<A>) => {

    const thread = functionToThread(workerFunction)

    return new Observable(observer => {

        return source.subscribe({
            next(arg) {
                thread.postMessage(arg);
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