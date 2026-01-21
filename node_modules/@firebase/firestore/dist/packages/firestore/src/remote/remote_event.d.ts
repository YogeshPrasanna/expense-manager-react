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
import { DocumentKeySet, MaybeDocumentMap } from '../model/collections';
import { MaybeDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
/**
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */
export declare class RemoteEvent {
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    readonly snapshotVersion: SnapshotVersion;
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    readonly targetChanges: {
        [targetId: number]: TargetChange;
    };
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    documentUpdates: MaybeDocumentMap;
    constructor(
        /**
         * The snapshot version this event brings us up to, or MIN if not set.
         */
        snapshotVersion: SnapshotVersion, 
        /**
         * A map from target to changes to the target. See TargetChange.
         */
        targetChanges: {
        [targetId: number]: TargetChange;
    }, 
        /**
         * A set of which documents have changed or been deleted, along with the
         * doc's new values (if not deleted).
         */
        documentUpdates: MaybeDocumentMap);
    addDocumentUpdate(doc: MaybeDocument): void;
    handleExistenceFilterMismatch(targetId: TargetId): void;
}
/**
 * Represents an update to the current status of a target, either explicitly
 * having no new state, or the new value to set. Note "current" has special
 * meaning for in the RPC protocol that implies that a target is both up-to-date
 * and consistent with the rest of the watch stream.
 */
export declare enum CurrentStatusUpdate {
    /** The current status is not affected and should not be modified. */
    None = 0,
    /** The target must be marked as no longer "current". */
    MarkNotCurrent = 1,
    /** The target must be marked as "current". */
    MarkCurrent = 2,
}
/**
 * A part of a RemoteEvent specifying set of changes to a specific target. These
 * changes track what documents are currently included in the target as well as
 * the current snapshot version and resume token but the actual changes *to*
 * documents are not part of the TargetChange since documents may be part of
 * multiple targets.
 */
export interface TargetChange {
    /**
     * The new "current" (synced) status of this target. Set to
     * CurrentStatusUpdateNone if the status should not be updated. Note "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    currentStatusUpdate: CurrentStatusUpdate;
    /**
     * A set of changes to documents in this target.
     */
    mapping: TargetMapping;
    /** The snapshot version that this target change brings us up to. */
    snapshotVersion: SnapshotVersion;
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    resumeToken: ProtoByteString;
}
export declare type TargetMapping = ResetMapping | UpdateMapping;
export declare class ResetMapping {
    private docs;
    readonly documents: DocumentKeySet;
    add(key: DocumentKey): void;
    delete(key: DocumentKey): void;
    isEqual(other: ResetMapping): boolean;
}
export declare class UpdateMapping {
    addedDocuments: DocumentKeySet;
    removedDocuments: DocumentKeySet;
    applyToKeySet(keys: DocumentKeySet): DocumentKeySet;
    add(key: DocumentKey): void;
    delete(key: DocumentKey): void;
    isEqual(other: UpdateMapping): boolean;
}
