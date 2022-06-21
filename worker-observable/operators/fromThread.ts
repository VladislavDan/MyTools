import {from} from 'rxjs';

import {functionToThread} from "../logic/functionToThread";

export const fromThread = <A, R>(arg: A, workerFunction: (arg: A) => R) => {

  const thread = functionToThread(workerFunction)

  const promise = new Promise((resolve, reject) => {
    thread.postMessage(arg);

    thread.onmessage = (event: MessageEvent) => {
      resolve(event.data);
      thread.terminate();
    }

    thread.onerror = (err) => {
      reject(err);
      thread.terminate();
    }
  });

  return from(promise);
}
