import {Subject} from "rxjs";
import {ISelector} from "./ISelector";

export interface IOutputSubject<S, O> {
    selector: ISelector<S, O>
    outputSubject: Subject<O>
}