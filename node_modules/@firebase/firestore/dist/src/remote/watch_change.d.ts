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
import { SnapshotVersion } from '../core/snapshot_version';
import { ProtoByteString, TargetId } from '../core/types';
import { QueryData } from '../local/query_data';
import { Document, NoDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { FirestoreError } from '../util/error';
import { ExistenceFilter } from './existence_filter';
import { RemoteEvent } from './remote_event';
/**
 * Internal representation of the watcher API protocol buffers.
 */
export declare type WatchChange = DocumentWatchChange | WatchTargetChange | ExistenceFilterChange;
/**
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */
export declare class DocumentWatchChange {
    /** The new document applies to all of these targets. */
    updatedTargetIds: TargetId[];
    /** The new document is removed from all of these targets. */
    removedTargetIds: TargetId[];
    /** The key of the document for this change. */
    key: DocumentKey;
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    newDoc: Document | NoDocument | null;
    constructor(
        /** The new document applies to all of these targets. */
        updatedTargetIds: TargetId[], 
        /** The new document is removed from all of these targets. */
        removedTargetIds: TargetId[], 
        /** The key of the document for this change. */
        key: DocumentKey, 
        /**
         * The new document or NoDocument if it was deleted. Is null if the
         * document went out of view without the server sending a new document.
         */
        newDoc: Document | NoDocument | null);
}
export declare class ExistenceFilterChange {
    targetId: TargetId;
    existenceFilter: ExistenceFilter;
    constructor(targetId: TargetId, existenceFilter: ExistenceFilter);
}
export declare enum WatchTargetChangeState {
    NoChange = 0,
    Added = 1,
    Removed = 2,
    Current = 3,
    Reset = 4,
}
export declare class WatchTargetChange {
    /** What kind of change occurred to the watch target. */
    state: WatchTargetChangeState;
    /** The target IDs that were added/removed/set. */
    targetIds: TargetId[];
    /**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the query. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    resumeToken: ProtoByteString;
    /** An RPC error indicating why the watch failed. */
    cause: FirestoreError | null;
    constructor(
        /** What kind of change occurred to the watch target. */
        state: WatchTargetChangeState, 
        /** The target IDs that were added/removed/set. */
        targetIds: TargetId[], 
        /**
         * An opaque, server-assigned token that allows watching a query to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the query. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */
        resumeToken?: ProtoByteString, 
        /** An RPC error indicating why the watch failed. */
        cause?: FirestoreError | null);
}
/**
 * A helper class to accumulate watch changes into a RemoteEvent and other
 * target information.
 */
export declare class WatchChangeAggregator {
    private snapshotVersion;
    private readonly listenTargets;
    constructor(snapshotVersion: SnapshotVersion, listenTargets: {
        [targetId: number]: QueryData;
    }, pendingTargetResponses: {
        [targetId: number]: number;
    });
    /** The existence filter - if any - for the given target IDs. */
    readonly existenceFilters: {
        [targetId: number]: ExistenceFilter;
    };
    /** The number of pending responses that we are waiting on from watch. */
    readonly pendingTargetResponses: {
        [targetId: number]: number;
    };
    /** Keeps track of the current target mappings */
    private targetChanges;
    /** Keeps track of document to update */
    private documentUpdates;
    /** Whether this aggregator was frozen and can no longer be modified */
    private frozen;
    /** Aggregates a watch change into the current state */
    add(watchChange: WatchChange): void;
    /** Aggregates all provided watch changes to the current state in order */
    addChanges(watchChanges: WatchChange[]): void;
    /**
     * Converts the current state into a remote event with the snapshot version
     * provided via the constructor.
     */
    createRemoteEvent(): RemoteEvent;
    private ensureTargetChange(targetId);
    /**
     * We need to wait for watch to ack targets before we process those events,
     * so to know if a target is active, there must be no pending acks we're
     * waiting for and it must be in the current list of targets that the client
     * cares about.
     *
     * This method is visible for testing.
     */
    protected isActiveTarget(targetId: TargetId): boolean;
    private addDocumentChange(docChange);
    private addTargetChange(targetChange);
    /**
     * Record that we get a watch target add/remove by decrementing the number of
     * pending target responses that we have.
     */
    private recordTargetResponse(targetId);
    private addExistenceFilterChange(change);
}
