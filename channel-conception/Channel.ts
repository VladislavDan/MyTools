import {Observable, Subject, Subscription} from 'rxjs';

import {WorkerObservable} from "../worker-observable/WorkerObservable";
import {jsonEqual} from "../logic/jsonEqual";

export class Channel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private subscriptions: Subscription[] = [];
    private previousEmittedValue: D | null = null;
    private comparatorWorker: WorkerObservable<{ value: D, other: D }, boolean> | null = null

    constructor(
        observableCreator: (arg: A) => Observable<D>
    ) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        this.subscriptions.push(this.observableCreator(value).subscribe(
            (value) => {
                this.outputSubject.next(value);
            },
            (error) => {
                this.outputSubject.error(error);
            }
        ));
    }

    subscribe(
        next?: (data: D) => void,
        customErrorHandler?: (error: Error) => void,
        deepEqual = false
    ): Subscription {
        const outputSubjectSubscription = this.outputSubject.subscribe(
            (data: D) => {
                if (next) {
                    if (deepEqual) {
                        this.deepEqual(next, data);
                    } else {
                        next(data)
                    }
                }
            },
            (error: Error) => {
                if (customErrorHandler) {
                    customErrorHandler(error);
                }
                console.error(error)
            }
        );
        this.subscriptions.push(outputSubjectSubscription);
        return outputSubjectSubscription;
    }

    private deepEqual(next: (data: D) => void, data: D): void {
        if (!this.previousEmittedValue) {
            next(data)
        }
        this.previousEmittedValue = data;

        if( !this.comparatorWorker ) {
            this.comparatorWorker = new WorkerObservable<{ value: D, other: D }, boolean>(
                jsonEqual
            )
        }

        this.comparatorWorker.getObservable(
            {value: data, other: this.previousEmittedValue}
        ).subscribe(
            (result) => {
                if (result) {
                    next(data)
                }
            },
            (equalityError) => {
                console.error(equalityError)
            }
        )
    }

    unsubscribe() {
        this.subscriptions.forEach((subscribtion: Subscription) => {
            if (!subscribtion.closed) {
                subscribtion.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
}
