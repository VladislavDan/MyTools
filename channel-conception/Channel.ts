import {Observable, Subject, Subscription} from 'rxjs';

import {jsonEqual} from "./logic/jsonEqual";
import {fromThread} from "../worker-observable/operators/fromThread";

export class Channel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private subscriptions: Subscription[] = [];
    private previousEmittedValue: D | null = null;
    private static globalErrorHandler = (error: Error) => {};
    private static globalNextHandler = () => {};

    constructor(
        observableCreator: (arg: A) => Observable<D>
    ) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        //Don't make implement complete method because it can affect on subject behaviour in app
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
                        Channel.globalNextHandler()
                    }
                }
            },
            (error: Error) => {
                if (customErrorHandler) {
                    customErrorHandler(error);
                }
                Channel.globalErrorHandler(error)
            }
        );
        this.subscriptions.push(outputSubjectSubscription);
        return outputSubjectSubscription;
    }

    private deepEqual(next: (data: D) => void, data: D): void {
        if (!this.previousEmittedValue) {
            next(data)
            Channel.globalNextHandler()
            this.previousEmittedValue = data;
        }

        const subscription = fromThread(
            {value: data, other: this.previousEmittedValue},
            jsonEqual
        ).subscribe(
            (result) => {
                if (!result) {
                    next(data)
                    Channel.globalNextHandler()
                    this.previousEmittedValue = data;
                }
            },
            (equalityError) => {
                console.error(equalityError)
            }
        )
        this.subscriptions.push(subscription)
    }

    unsubscribe() {
        this.subscriptions.forEach((subscribtion: Subscription) => {
            if (!subscribtion.closed) {
                subscribtion.unsubscribe();
            }
        });
        this.subscriptions = [];
        this.previousEmittedValue = null;
    }

    static setGlobalErrorHandler = (globalErrorHandler: (error: Error) => void) => {
        Channel.globalErrorHandler = globalErrorHandler;
    }

    static setGlobalNextHandler = (globalNextHandler: () => void) => {
        Channel.globalNextHandler = globalNextHandler;
    }
}
