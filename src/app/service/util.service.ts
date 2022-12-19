import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UtilService {
    showSubscriptionDialogSubject: Subject<void> = new Subject<void>();
    hideSubscriptionDialogSubject: Subject<void> = new Subject<void>();
    showLoginDialogSubject: Subject<void> = new Subject<void>();
    hideLoginDialogSubject: Subject<void> = new Subject<void>();

    constructor() {
    }


    static getPartOfName(name: string, part: number) {
        const nameSplit: string[] = name.split(' ');
        if (part === 1) {
            if (nameSplit.length === 2) {
                return nameSplit[0];
            } else {
                return nameSplit.slice(0, 2).join(' ');
            }
        } else {
            if (nameSplit.length === 2) {
                return nameSplit[1];
            } else {
                return nameSplit.slice(2).join(' ');
            }
        }
    }

    showSubscriptionDialog() {
        // this.showSubscriptionDialogSubject.next();
    }

    hideSubscriptionDialog() {
        this.hideSubscriptionDialogSubject.next();
    }

    showLoginDialog() {
        this.showLoginDialogSubject.next();
    }

    hideLoginDialog() {
        this.hideLoginDialogSubject.next();
    }
}
