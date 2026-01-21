import { _FirebaseNamespace } from '@firebase/app-types/private';
import * as types from '@firebase/messaging-types';
export declare function registerMessaging(instance: _FirebaseNamespace): void;
/**
 * Define extension behavior of `registerMessaging`
 */
declare module '@firebase/app-types' {
    interface FirebaseNamespace {
        messaging?: {
            (app?: FirebaseApp): types.FirebaseMessaging;
            Messaging: typeof types.FirebaseMessaging;
        };
    }
    interface FirebaseApp {
        messaging?(): types.FirebaseMessaging;
    }
}
