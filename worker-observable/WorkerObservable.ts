import {Observable, Observer} from 'rxjs';

export class WorkerObservable <A, R>{

    private thread: Worker;

    constructor(workerFunction: (arg: A) => R) {

        const functionString = "(function(){ postMessage("+workerFunction.toString()+")})()";

        const functionBlob = new Blob([functionString], {type: 'text/javascript'});

        this.thread = new Worker(URL.createObjectURL(functionBlob));
    }

    public getObservable = (arg: A) => {

        const workerObservable = new Observable((observer: Observer<R>) => {
            this.thread.postMessage(arg);

            this.thread.onmessage = (event: MessageEvent) => {
                observer.next(event.data);
                observer.complete();
            }
        });

        return workerObservable;
    };
}
