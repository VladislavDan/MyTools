import {Observable} from 'rxjs';
import {Channel} from 'MyTools/channel-conception/Channel';

export const getChannel = <A, D>(observableCreator: (arg: A) => Observable<D>): Channel<A, D> => {
    return new Channel(observableCreator);
}
