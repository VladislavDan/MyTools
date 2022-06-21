import {Observable} from 'rxjs';

import {functionToThread} from "../logic/functionToThread";

export const inThread = <SA, R>(
  arg: SA,
  workerFunction: (arg: SA) => R,
  likeTap = false
) => (source: Observable<SA>) => {

  const thread = functionToThread(workerFunction)

  return new Observable(observer => {

    return source.subscribe({
      next(arg) {
        thread.postMessage(arg);
        if (!likeTap) {
          thread.onmessage = (event: MessageEvent) => {
            observer.next(event.data);
            thread.terminate();
            observer.complete();
          }
        } else {
          thread.onmessage = () => {
            thread.terminate();
          }
          observer.next(arg);
          observer.complete();
        }
      },
      error() {
        if (!likeTap) {
          thread.onerror = (err) => {
            observer.error(err);
            thread.terminate();
          }
        } else {
          thread.onerror = (err) => {
            console.warn(err);
            thread.terminate();
          }
          observer.complete();
        }
      }
    });
  });
}
