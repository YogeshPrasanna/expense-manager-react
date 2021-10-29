/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { User } from '../auth/user';
import { Transaction } from '../core/transaction';
import { OnlineState, TargetId } from '../core/types';
import { LocalStore } from '../local/local_store';
import { QueryData } from '../local/query_data';
import { Datastore } from './datastore';
import { RemoteSyncer } from './remote_syncer';
import { AsyncQueue } from '../util/async_queue';
/**
 * RemoteStore - An interface to remotely stored data, basically providing a
 * wrapper around the Datastore that is more reliable for the rest of the
 * system.
 *
 * RemoteStore is responsible for maintaining the connection to the server.
 * - maintaining a list of active listens.
 * - reconnecting when the connection is dropped.
 * - resuming all the active listens on reconnect.
 *
 * RemoteStore handles all incoming events from the Datastore.
 * - listening to the watch stream and repackaging the events as RemoteEvents
 * - notifying SyncEngine of any changes to the active listens.
 *
 * RemoteStore takes writes from other components and handles them reliably.
 * - pulling pending mutations from LocalStore and sending them to Datastore.
 * - retrying mutations that failed because of network problems.
 * - acking mutations to the SyncEngine once they are accepted or rejected.
 */
export declare class RemoteStore {
    /**
     * The local store, used to fill the write pipeline with outbound
     * mutations and resolve existence filter mismatches.
     */
    private localStore;
    /** The client-side proxy for interacting with the backend. */
    private datastore;
    private pendingWrites;
    private lastBatchSeen;
    /**
     * A mapping of watched targets that the client cares about tracking and the
     * user has explicitly called a 'listen' for this target.
     *
     * These targets may or may not have been sent to or acknowledged by the
     * server. On re-establishing the listen stream, these targets should be sent
     * to the server. The targets removed with unlistens are removed eagerly
     * without waiting for confirmation from the listen stream.
     */
    private listenTargets;
    /**
     * A mapping of targetId to pending acks needed.
     *
     * If a targetId is present in this map, then we're waiting for watch to
     * acknowledge a removal or addition of the target. If a target is not in this
     * mapping, and it's in the listenTargets map, then we consider the target to
     * be active.
     *
     * We increment the count here every time we issue a request over the stream
     * to watch or unwatch. We then decrement the count every time we get a target
     * added or target removed message from the server. Once the count is equal to
     * 0 we know that the client and server are in the same state (once this state
     * is reached the targetId is removed from the map to free the memory).
     */
    private pendingTargetResponses;
    private accumulatedWatchChanges;
    private watchStream;
    private writeStream;
    private onlineStateTracker;
    constructor(
        /**
         * The local store, used to fill the write pipeline with outbound
         * mutations and resolve existence filter mismatches.
         */
        localStore: LocalStore, 
        /** The client-side proxy for interacting with the backend. */
        datastore: Datastore, asyncQueue: AsyncQueue, onlineStateHandler: (onlineState: OnlineState) => void);
    /** SyncEngine to notify of watch and write events. */
    syncEngine: RemoteSyncer;
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */
    start(): Promise<void>;
    private isNetworkEnabled();
    /** Re-enables the network. Idempotent. */
    enableNetwork(): Promise<void>;
    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */
    disableNetwork(): Promise<void>;
    /**
     * Disables the network, if it is currently enabled.
     */
    private disableNetworkInternal();
    shutdown(): Promise<void>;
    /** Starts new listen for the given query. Uses resume token if provided */
    listen(queryData: QueryData): void;
    /** Removes the listen from server */
    unlisten(targetId: TargetId): void;
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */
    private sendWatchRequest(queryData);
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */
    private sendUnwatchRequest(targetId);
    /**
     * Increment the mapping of how many acks are needed from watch before we can
     * consider the server to be 'in-sync' with the client's active targets.
     */
    private recordPendingTargetRequest(targetId);
    private startWatchStream();
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */
    private shouldStartWatchStream();
    private cleanUpWatchStreamState();
    private onWatchStreamOpen();
    private onWatchStreamClose(error);
    private onWatchStreamChange(watchChange, snapshotVersion);
    /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
    private handleWatchChangeBatch(snapshotVersion, changes);
    /** Handles an error on a target */
    private handleTargetError(watchChange);
    cleanUpWriteStreamState(): void;
    /**
     * Notifies that there are new mutations to process in the queue. This is
     * typically called by SyncEngine after it has sent mutations to LocalStore.
     */
    fillWritePipeline(): Promise<void>;
    /**
     * Returns true if the backend can accept additional write requests.
     *
     * When sending mutations to the write stream (e.g. in fillWritePipeline),
     * call this method first to check if more mutations can be sent.
     *
     * Currently the only thing that can prevent the backend from accepting
     * write requests is if there are too many requests already outstanding. As
     * writes complete the backend will be able to accept more.
     */
    canWriteMutations(): boolean;
    outstandingWrites(): number;
    /**
     * Given mutations to commit, actually commits them to the Datastore. Note
     * that this does *not* return a Promise specifically because the AsyncQueue
     * should not block operations for this.
     */
    private commit(batch);
    private shouldStartWriteStream();
    private startWriteStream();
    private onWriteStreamOpen();
    private onWriteHandshakeComplete();
    private onMutationResult(commitVersion, results);
    private onWriteStreamClose(error?);
    private handleHandshakeError(error);
    private handleWriteError(error);
    createTransaction(): Transaction;
    handleUserChange(user: User): Promise<void>;
}
