import {Observable} from 'rxjs';

import {functionToThread} from "../logic/functionToThread";

export const fromThread = <A, R>(arg: A, workerFunction: (arg: A) => R) => {

    const thread = functionToThread(workerFunction)

    return new Observable(observer => {
        thread.postMessage(arg);
        thread.onmessage = (event: MessageEvent) => {
            observer.next(event.data);
            observer.complete();
            thread.terminate();
        }
        thread.onerror = (err) => {
            observer.error(err);
        }
    })
}