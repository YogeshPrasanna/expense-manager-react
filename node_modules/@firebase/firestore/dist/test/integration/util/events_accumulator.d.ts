/**
 * A helper object that can accumulate an arbitrary amount of events and resolve
 * a promise when expected number has been emitted.
 */
export declare class EventsAccumulator<T> {
    private events;
    private waitingFor;
    private deferred;
    storeEvent: (evt: T) => void;
    awaitEvents(length: number): Promise<T[]>;
    awaitEvent(): Promise<T>;
    assertNoAdditionalEvents(): Promise<void>;
    private checkFulfilled();
}
