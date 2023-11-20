// package: prehog.v1alpha
// file: prehog/v1alpha/teleport.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class UserLoginEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UserLoginEvent;

    getConnectorType(): string;
    setConnectorType(value: string): UserLoginEvent;

    getDeviceId(): string;
    setDeviceId(value: string): UserLoginEvent;

    getRequiredPrivateKeyPolicy(): string;
    setRequiredPrivateKeyPolicy(value: string): UserLoginEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserLoginEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UserLoginEvent): UserLoginEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserLoginEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserLoginEvent;
    static deserializeBinaryFromReader(message: UserLoginEvent, reader: jspb.BinaryReader): UserLoginEvent;
}

export namespace UserLoginEvent {
    export type AsObject = {
        userName: string,
        connectorType: string,
        deviceId: string,
        requiredPrivateKeyPolicy: string,
    }
}

export class SSOCreateEvent extends jspb.Message { 
    getConnectorType(): string;
    setConnectorType(value: string): SSOCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SSOCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SSOCreateEvent): SSOCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SSOCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SSOCreateEvent;
    static deserializeBinaryFromReader(message: SSOCreateEvent, reader: jspb.BinaryReader): SSOCreateEvent;
}

export namespace SSOCreateEvent {
    export type AsObject = {
        connectorType: string,
    }
}

export class ResourceCreateEvent extends jspb.Message { 
    getResourceType(): string;
    setResourceType(value: string): ResourceCreateEvent;

    getResourceOrigin(): string;
    setResourceOrigin(value: string): ResourceCreateEvent;

    getCloudProvider(): string;
    setCloudProvider(value: string): ResourceCreateEvent;


    hasDatabase(): boolean;
    clearDatabase(): void;
    getDatabase(): DiscoveredDatabaseMetadata | undefined;
    setDatabase(value?: DiscoveredDatabaseMetadata): ResourceCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResourceCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: ResourceCreateEvent): ResourceCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResourceCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResourceCreateEvent;
    static deserializeBinaryFromReader(message: ResourceCreateEvent, reader: jspb.BinaryReader): ResourceCreateEvent;
}

export namespace ResourceCreateEvent {
    export type AsObject = {
        resourceType: string,
        resourceOrigin: string,
        cloudProvider: string,
        database?: DiscoveredDatabaseMetadata.AsObject,
    }
}

export class DiscoveredDatabaseMetadata extends jspb.Message { 
    getDbType(): string;
    setDbType(value: string): DiscoveredDatabaseMetadata;

    getDbProtocol(): string;
    setDbProtocol(value: string): DiscoveredDatabaseMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscoveredDatabaseMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: DiscoveredDatabaseMetadata): DiscoveredDatabaseMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscoveredDatabaseMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscoveredDatabaseMetadata;
    static deserializeBinaryFromReader(message: DiscoveredDatabaseMetadata, reader: jspb.BinaryReader): DiscoveredDatabaseMetadata;
}

export namespace DiscoveredDatabaseMetadata {
    export type AsObject = {
        dbType: string,
        dbProtocol: string,
    }
}

export class ResourceHeartbeatEvent extends jspb.Message { 
    getResourceName(): Uint8Array | string;
    getResourceName_asU8(): Uint8Array;
    getResourceName_asB64(): string;
    setResourceName(value: Uint8Array | string): ResourceHeartbeatEvent;

    getResourceKind(): ResourceKind;
    setResourceKind(value: ResourceKind): ResourceHeartbeatEvent;

    getStatic(): boolean;
    setStatic(value: boolean): ResourceHeartbeatEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResourceHeartbeatEvent.AsObject;
    static toObject(includeInstance: boolean, msg: ResourceHeartbeatEvent): ResourceHeartbeatEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResourceHeartbeatEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResourceHeartbeatEvent;
    static deserializeBinaryFromReader(message: ResourceHeartbeatEvent, reader: jspb.BinaryReader): ResourceHeartbeatEvent;
}

export namespace ResourceHeartbeatEvent {
    export type AsObject = {
        resourceName: Uint8Array | string,
        resourceKind: ResourceKind,
        pb_static: boolean,
    }
}

export class SessionStartEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): SessionStartEvent;

    getSessionType(): string;
    setSessionType(value: string): SessionStartEvent;


    hasDatabase(): boolean;
    clearDatabase(): void;
    getDatabase(): SessionStartDatabaseMetadata | undefined;
    setDatabase(value?: SessionStartDatabaseMetadata): SessionStartEvent;


    hasDesktop(): boolean;
    clearDesktop(): void;
    getDesktop(): SessionStartDesktopMetadata | undefined;
    setDesktop(value?: SessionStartDesktopMetadata): SessionStartEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SessionStartEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SessionStartEvent): SessionStartEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SessionStartEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SessionStartEvent;
    static deserializeBinaryFromReader(message: SessionStartEvent, reader: jspb.BinaryReader): SessionStartEvent;
}

export namespace SessionStartEvent {
    export type AsObject = {
        userName: string,
        sessionType: string,
        database?: SessionStartDatabaseMetadata.AsObject,
        desktop?: SessionStartDesktopMetadata.AsObject,
    }
}

export class SessionStartDatabaseMetadata extends jspb.Message { 
    getDbType(): string;
    setDbType(value: string): SessionStartDatabaseMetadata;

    getDbProtocol(): string;
    setDbProtocol(value: string): SessionStartDatabaseMetadata;

    getDbOrigin(): string;
    setDbOrigin(value: string): SessionStartDatabaseMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SessionStartDatabaseMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SessionStartDatabaseMetadata): SessionStartDatabaseMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SessionStartDatabaseMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SessionStartDatabaseMetadata;
    static deserializeBinaryFromReader(message: SessionStartDatabaseMetadata, reader: jspb.BinaryReader): SessionStartDatabaseMetadata;
}

export namespace SessionStartDatabaseMetadata {
    export type AsObject = {
        dbType: string,
        dbProtocol: string,
        dbOrigin: string,
    }
}

export class SessionStartDesktopMetadata extends jspb.Message { 
    getDesktopType(): string;
    setDesktopType(value: string): SessionStartDesktopMetadata;

    getOrigin(): string;
    setOrigin(value: string): SessionStartDesktopMetadata;

    getWindowsDomain(): string;
    setWindowsDomain(value: string): SessionStartDesktopMetadata;

    getAllowUserCreation(): boolean;
    setAllowUserCreation(value: boolean): SessionStartDesktopMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SessionStartDesktopMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SessionStartDesktopMetadata): SessionStartDesktopMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SessionStartDesktopMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SessionStartDesktopMetadata;
    static deserializeBinaryFromReader(message: SessionStartDesktopMetadata, reader: jspb.BinaryReader): SessionStartDesktopMetadata;
}

export namespace SessionStartDesktopMetadata {
    export type AsObject = {
        desktopType: string,
        origin: string,
        windowsDomain: string,
        allowUserCreation: boolean,
    }
}

export class UserCertificateIssuedEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UserCertificateIssuedEvent;


    hasTtl(): boolean;
    clearTtl(): void;
    getTtl(): google_protobuf_duration_pb.Duration | undefined;
    setTtl(value?: google_protobuf_duration_pb.Duration): UserCertificateIssuedEvent;

    getIsBot(): boolean;
    setIsBot(value: boolean): UserCertificateIssuedEvent;

    getUsageDatabase(): boolean;
    setUsageDatabase(value: boolean): UserCertificateIssuedEvent;

    getUsageApp(): boolean;
    setUsageApp(value: boolean): UserCertificateIssuedEvent;

    getUsageKubernetes(): boolean;
    setUsageKubernetes(value: boolean): UserCertificateIssuedEvent;

    getUsageDesktop(): boolean;
    setUsageDesktop(value: boolean): UserCertificateIssuedEvent;

    getPrivateKeyPolicy(): string;
    setPrivateKeyPolicy(value: string): UserCertificateIssuedEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserCertificateIssuedEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UserCertificateIssuedEvent): UserCertificateIssuedEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserCertificateIssuedEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserCertificateIssuedEvent;
    static deserializeBinaryFromReader(message: UserCertificateIssuedEvent, reader: jspb.BinaryReader): UserCertificateIssuedEvent;
}

export namespace UserCertificateIssuedEvent {
    export type AsObject = {
        userName: string,
        ttl?: google_protobuf_duration_pb.Duration.AsObject,
        isBot: boolean,
        usageDatabase: boolean,
        usageApp: boolean,
        usageKubernetes: boolean,
        usageDesktop: boolean,
        privateKeyPolicy: string,
    }
}

export class UIBannerClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIBannerClickEvent;

    getAlert(): string;
    setAlert(value: string): UIBannerClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIBannerClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIBannerClickEvent): UIBannerClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIBannerClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIBannerClickEvent;
    static deserializeBinaryFromReader(message: UIBannerClickEvent, reader: jspb.BinaryReader): UIBannerClickEvent;
}

export namespace UIBannerClickEvent {
    export type AsObject = {
        userName: string,
        alert: string,
    }
}

export class UIOnboardCompleteGoToDashboardClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardCompleteGoToDashboardClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardCompleteGoToDashboardClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardCompleteGoToDashboardClickEvent): UIOnboardCompleteGoToDashboardClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardCompleteGoToDashboardClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardCompleteGoToDashboardClickEvent;
    static deserializeBinaryFromReader(message: UIOnboardCompleteGoToDashboardClickEvent, reader: jspb.BinaryReader): UIOnboardCompleteGoToDashboardClickEvent;
}

export namespace UIOnboardCompleteGoToDashboardClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIOnboardAddFirstResourceClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardAddFirstResourceClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardAddFirstResourceClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardAddFirstResourceClickEvent): UIOnboardAddFirstResourceClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardAddFirstResourceClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardAddFirstResourceClickEvent;
    static deserializeBinaryFromReader(message: UIOnboardAddFirstResourceClickEvent, reader: jspb.BinaryReader): UIOnboardAddFirstResourceClickEvent;
}

export namespace UIOnboardAddFirstResourceClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIOnboardAddFirstResourceLaterClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardAddFirstResourceLaterClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardAddFirstResourceLaterClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardAddFirstResourceLaterClickEvent): UIOnboardAddFirstResourceLaterClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardAddFirstResourceLaterClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardAddFirstResourceLaterClickEvent;
    static deserializeBinaryFromReader(message: UIOnboardAddFirstResourceLaterClickEvent, reader: jspb.BinaryReader): UIOnboardAddFirstResourceLaterClickEvent;
}

export namespace UIOnboardAddFirstResourceLaterClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIOnboardSetCredentialSubmitEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardSetCredentialSubmitEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardSetCredentialSubmitEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardSetCredentialSubmitEvent): UIOnboardSetCredentialSubmitEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardSetCredentialSubmitEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardSetCredentialSubmitEvent;
    static deserializeBinaryFromReader(message: UIOnboardSetCredentialSubmitEvent, reader: jspb.BinaryReader): UIOnboardSetCredentialSubmitEvent;
}

export namespace UIOnboardSetCredentialSubmitEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIOnboardRegisterChallengeSubmitEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardRegisterChallengeSubmitEvent;

    getMfaType(): string;
    setMfaType(value: string): UIOnboardRegisterChallengeSubmitEvent;

    getLoginFlow(): string;
    setLoginFlow(value: string): UIOnboardRegisterChallengeSubmitEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardRegisterChallengeSubmitEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardRegisterChallengeSubmitEvent): UIOnboardRegisterChallengeSubmitEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardRegisterChallengeSubmitEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardRegisterChallengeSubmitEvent;
    static deserializeBinaryFromReader(message: UIOnboardRegisterChallengeSubmitEvent, reader: jspb.BinaryReader): UIOnboardRegisterChallengeSubmitEvent;
}

export namespace UIOnboardRegisterChallengeSubmitEvent {
    export type AsObject = {
        userName: string,
        mfaType: string,
        loginFlow: string,
    }
}

export class UIOnboardQuestionnaireSubmitEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIOnboardQuestionnaireSubmitEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIOnboardQuestionnaireSubmitEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIOnboardQuestionnaireSubmitEvent): UIOnboardQuestionnaireSubmitEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIOnboardQuestionnaireSubmitEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIOnboardQuestionnaireSubmitEvent;
    static deserializeBinaryFromReader(message: UIOnboardQuestionnaireSubmitEvent, reader: jspb.BinaryReader): UIOnboardQuestionnaireSubmitEvent;
}

export namespace UIOnboardQuestionnaireSubmitEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIRecoveryCodesContinueClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIRecoveryCodesContinueClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIRecoveryCodesContinueClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIRecoveryCodesContinueClickEvent): UIRecoveryCodesContinueClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIRecoveryCodesContinueClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIRecoveryCodesContinueClickEvent;
    static deserializeBinaryFromReader(message: UIRecoveryCodesContinueClickEvent, reader: jspb.BinaryReader): UIRecoveryCodesContinueClickEvent;
}

export namespace UIRecoveryCodesContinueClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIRecoveryCodesCopyClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIRecoveryCodesCopyClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIRecoveryCodesCopyClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIRecoveryCodesCopyClickEvent): UIRecoveryCodesCopyClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIRecoveryCodesCopyClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIRecoveryCodesCopyClickEvent;
    static deserializeBinaryFromReader(message: UIRecoveryCodesCopyClickEvent, reader: jspb.BinaryReader): UIRecoveryCodesCopyClickEvent;
}

export namespace UIRecoveryCodesCopyClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UIRecoveryCodesPrintClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UIRecoveryCodesPrintClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIRecoveryCodesPrintClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIRecoveryCodesPrintClickEvent): UIRecoveryCodesPrintClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIRecoveryCodesPrintClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIRecoveryCodesPrintClickEvent;
    static deserializeBinaryFromReader(message: UIRecoveryCodesPrintClickEvent, reader: jspb.BinaryReader): UIRecoveryCodesPrintClickEvent;
}

export namespace UIRecoveryCodesPrintClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class DiscoverMetadata extends jspb.Message { 
    getId(): string;
    setId(value: string): DiscoverMetadata;

    getUserName(): string;
    setUserName(value: string): DiscoverMetadata;

    getSso(): boolean;
    setSso(value: boolean): DiscoverMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscoverMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: DiscoverMetadata): DiscoverMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscoverMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscoverMetadata;
    static deserializeBinaryFromReader(message: DiscoverMetadata, reader: jspb.BinaryReader): DiscoverMetadata;
}

export namespace DiscoverMetadata {
    export type AsObject = {
        id: string,
        userName: string,
        sso: boolean,
    }
}

export class DiscoverResourceMetadata extends jspb.Message { 
    getResource(): DiscoverResource;
    setResource(value: DiscoverResource): DiscoverResourceMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscoverResourceMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: DiscoverResourceMetadata): DiscoverResourceMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscoverResourceMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscoverResourceMetadata;
    static deserializeBinaryFromReader(message: DiscoverResourceMetadata, reader: jspb.BinaryReader): DiscoverResourceMetadata;
}

export namespace DiscoverResourceMetadata {
    export type AsObject = {
        resource: DiscoverResource,
    }
}

export class DiscoverStepStatus extends jspb.Message { 
    getStatus(): DiscoverStatus;
    setStatus(value: DiscoverStatus): DiscoverStepStatus;

    getError(): string;
    setError(value: string): DiscoverStepStatus;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscoverStepStatus.AsObject;
    static toObject(includeInstance: boolean, msg: DiscoverStepStatus): DiscoverStepStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscoverStepStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscoverStepStatus;
    static deserializeBinaryFromReader(message: DiscoverStepStatus, reader: jspb.BinaryReader): DiscoverStepStatus;
}

export namespace DiscoverStepStatus {
    export type AsObject = {
        status: DiscoverStatus,
        error: string,
    }
}

export class UIDiscoverStartedEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverStartedEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverStartedEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverStartedEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverStartedEvent): UIDiscoverStartedEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverStartedEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverStartedEvent;
    static deserializeBinaryFromReader(message: UIDiscoverStartedEvent, reader: jspb.BinaryReader): UIDiscoverStartedEvent;
}

export namespace UIDiscoverStartedEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverResourceSelectionEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverResourceSelectionEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverResourceSelectionEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverResourceSelectionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverResourceSelectionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverResourceSelectionEvent): UIDiscoverResourceSelectionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverResourceSelectionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverResourceSelectionEvent;
    static deserializeBinaryFromReader(message: UIDiscoverResourceSelectionEvent, reader: jspb.BinaryReader): UIDiscoverResourceSelectionEvent;
}

export namespace UIDiscoverResourceSelectionEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverIntegrationAWSOIDCConnectEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverIntegrationAWSOIDCConnectEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverIntegrationAWSOIDCConnectEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverIntegrationAWSOIDCConnectEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverIntegrationAWSOIDCConnectEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverIntegrationAWSOIDCConnectEvent): UIDiscoverIntegrationAWSOIDCConnectEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverIntegrationAWSOIDCConnectEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverIntegrationAWSOIDCConnectEvent;
    static deserializeBinaryFromReader(message: UIDiscoverIntegrationAWSOIDCConnectEvent, reader: jspb.BinaryReader): UIDiscoverIntegrationAWSOIDCConnectEvent;
}

export namespace UIDiscoverIntegrationAWSOIDCConnectEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDatabaseRDSEnrollEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDatabaseRDSEnrollEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDatabaseRDSEnrollEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDatabaseRDSEnrollEvent;

    getSelectedResourcesCount(): number;
    setSelectedResourcesCount(value: number): UIDiscoverDatabaseRDSEnrollEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDatabaseRDSEnrollEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDatabaseRDSEnrollEvent): UIDiscoverDatabaseRDSEnrollEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDatabaseRDSEnrollEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDatabaseRDSEnrollEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDatabaseRDSEnrollEvent, reader: jspb.BinaryReader): UIDiscoverDatabaseRDSEnrollEvent;
}

export namespace UIDiscoverDatabaseRDSEnrollEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
        selectedResourcesCount: number,
    }
}

export class UIDiscoverDeployServiceEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDeployServiceEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDeployServiceEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDeployServiceEvent;

    getDeployMethod(): UIDiscoverDeployServiceEvent.DeployMethod;
    setDeployMethod(value: UIDiscoverDeployServiceEvent.DeployMethod): UIDiscoverDeployServiceEvent;

    getDeployType(): UIDiscoverDeployServiceEvent.DeployType;
    setDeployType(value: UIDiscoverDeployServiceEvent.DeployType): UIDiscoverDeployServiceEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDeployServiceEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDeployServiceEvent): UIDiscoverDeployServiceEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDeployServiceEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDeployServiceEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDeployServiceEvent, reader: jspb.BinaryReader): UIDiscoverDeployServiceEvent;
}

export namespace UIDiscoverDeployServiceEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
        deployMethod: UIDiscoverDeployServiceEvent.DeployMethod,
        deployType: UIDiscoverDeployServiceEvent.DeployType,
    }

    export enum DeployMethod {
    DEPLOY_METHOD_UNSPECIFIED = 0,
    DEPLOY_METHOD_AUTO = 1,
    DEPLOY_METHOD_MANUAL = 2,
    }

    export enum DeployType {
    DEPLOY_TYPE_UNSPECIFIED = 0,
    DEPLOY_TYPE_INSTALL_SCRIPT = 1,
    DEPLOY_TYPE_AMAZON_ECS = 2,
    }

}

export class UIDiscoverDatabaseRegisterEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDatabaseRegisterEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDatabaseRegisterEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDatabaseRegisterEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDatabaseRegisterEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDatabaseRegisterEvent): UIDiscoverDatabaseRegisterEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDatabaseRegisterEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDatabaseRegisterEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDatabaseRegisterEvent, reader: jspb.BinaryReader): UIDiscoverDatabaseRegisterEvent;
}

export namespace UIDiscoverDatabaseRegisterEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDatabaseConfigureMTLSEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDatabaseConfigureMTLSEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDatabaseConfigureMTLSEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDatabaseConfigureMTLSEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDatabaseConfigureMTLSEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDatabaseConfigureMTLSEvent): UIDiscoverDatabaseConfigureMTLSEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDatabaseConfigureMTLSEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDatabaseConfigureMTLSEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDatabaseConfigureMTLSEvent, reader: jspb.BinaryReader): UIDiscoverDatabaseConfigureMTLSEvent;
}

export namespace UIDiscoverDatabaseConfigureMTLSEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDesktopActiveDirectoryToolsInstallEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDesktopActiveDirectoryToolsInstallEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDesktopActiveDirectoryToolsInstallEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDesktopActiveDirectoryToolsInstallEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDesktopActiveDirectoryToolsInstallEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDesktopActiveDirectoryToolsInstallEvent): UIDiscoverDesktopActiveDirectoryToolsInstallEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDesktopActiveDirectoryToolsInstallEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDesktopActiveDirectoryToolsInstallEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDesktopActiveDirectoryToolsInstallEvent, reader: jspb.BinaryReader): UIDiscoverDesktopActiveDirectoryToolsInstallEvent;
}

export namespace UIDiscoverDesktopActiveDirectoryToolsInstallEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDesktopActiveDirectoryConfigureEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDesktopActiveDirectoryConfigureEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDesktopActiveDirectoryConfigureEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDesktopActiveDirectoryConfigureEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDesktopActiveDirectoryConfigureEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDesktopActiveDirectoryConfigureEvent): UIDiscoverDesktopActiveDirectoryConfigureEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDesktopActiveDirectoryConfigureEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDesktopActiveDirectoryConfigureEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDesktopActiveDirectoryConfigureEvent, reader: jspb.BinaryReader): UIDiscoverDesktopActiveDirectoryConfigureEvent;
}

export namespace UIDiscoverDesktopActiveDirectoryConfigureEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverAutoDiscoveredResourcesEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverAutoDiscoveredResourcesEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverAutoDiscoveredResourcesEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverAutoDiscoveredResourcesEvent;

    getResourcesCount(): number;
    setResourcesCount(value: number): UIDiscoverAutoDiscoveredResourcesEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverAutoDiscoveredResourcesEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverAutoDiscoveredResourcesEvent): UIDiscoverAutoDiscoveredResourcesEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverAutoDiscoveredResourcesEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverAutoDiscoveredResourcesEvent;
    static deserializeBinaryFromReader(message: UIDiscoverAutoDiscoveredResourcesEvent, reader: jspb.BinaryReader): UIDiscoverAutoDiscoveredResourcesEvent;
}

export namespace UIDiscoverAutoDiscoveredResourcesEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
        resourcesCount: number,
    }
}

export class UIDiscoverEC2InstanceSelectionEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverEC2InstanceSelectionEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverEC2InstanceSelectionEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverEC2InstanceSelectionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverEC2InstanceSelectionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverEC2InstanceSelectionEvent): UIDiscoverEC2InstanceSelectionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverEC2InstanceSelectionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverEC2InstanceSelectionEvent;
    static deserializeBinaryFromReader(message: UIDiscoverEC2InstanceSelectionEvent, reader: jspb.BinaryReader): UIDiscoverEC2InstanceSelectionEvent;
}

export namespace UIDiscoverEC2InstanceSelectionEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDeployEICEEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDeployEICEEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDeployEICEEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDeployEICEEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDeployEICEEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDeployEICEEvent): UIDiscoverDeployEICEEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDeployEICEEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDeployEICEEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDeployEICEEvent, reader: jspb.BinaryReader): UIDiscoverDeployEICEEvent;
}

export namespace UIDiscoverDeployEICEEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverCreateNodeEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverCreateNodeEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverCreateNodeEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverCreateNodeEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverCreateNodeEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverCreateNodeEvent): UIDiscoverCreateNodeEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverCreateNodeEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverCreateNodeEvent;
    static deserializeBinaryFromReader(message: UIDiscoverCreateNodeEvent, reader: jspb.BinaryReader): UIDiscoverCreateNodeEvent;
}

export namespace UIDiscoverCreateNodeEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverDatabaseConfigureIAMPolicyEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverDatabaseConfigureIAMPolicyEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverDatabaseConfigureIAMPolicyEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverDatabaseConfigureIAMPolicyEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverDatabaseConfigureIAMPolicyEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverDatabaseConfigureIAMPolicyEvent): UIDiscoverDatabaseConfigureIAMPolicyEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverDatabaseConfigureIAMPolicyEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverDatabaseConfigureIAMPolicyEvent;
    static deserializeBinaryFromReader(message: UIDiscoverDatabaseConfigureIAMPolicyEvent, reader: jspb.BinaryReader): UIDiscoverDatabaseConfigureIAMPolicyEvent;
}

export namespace UIDiscoverDatabaseConfigureIAMPolicyEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverPrincipalsConfigureEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverPrincipalsConfigureEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverPrincipalsConfigureEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverPrincipalsConfigureEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverPrincipalsConfigureEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverPrincipalsConfigureEvent): UIDiscoverPrincipalsConfigureEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverPrincipalsConfigureEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverPrincipalsConfigureEvent;
    static deserializeBinaryFromReader(message: UIDiscoverPrincipalsConfigureEvent, reader: jspb.BinaryReader): UIDiscoverPrincipalsConfigureEvent;
}

export namespace UIDiscoverPrincipalsConfigureEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverTestConnectionEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverTestConnectionEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverTestConnectionEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverTestConnectionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverTestConnectionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverTestConnectionEvent): UIDiscoverTestConnectionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverTestConnectionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverTestConnectionEvent;
    static deserializeBinaryFromReader(message: UIDiscoverTestConnectionEvent, reader: jspb.BinaryReader): UIDiscoverTestConnectionEvent;
}

export namespace UIDiscoverTestConnectionEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class UIDiscoverCompletedEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): DiscoverMetadata | undefined;
    setMetadata(value?: DiscoverMetadata): UIDiscoverCompletedEvent;


    hasResource(): boolean;
    clearResource(): void;
    getResource(): DiscoverResourceMetadata | undefined;
    setResource(value?: DiscoverResourceMetadata): UIDiscoverCompletedEvent;


    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): DiscoverStepStatus | undefined;
    setStatus(value?: DiscoverStepStatus): UIDiscoverCompletedEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIDiscoverCompletedEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIDiscoverCompletedEvent): UIDiscoverCompletedEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIDiscoverCompletedEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIDiscoverCompletedEvent;
    static deserializeBinaryFromReader(message: UIDiscoverCompletedEvent, reader: jspb.BinaryReader): UIDiscoverCompletedEvent;
}

export namespace UIDiscoverCompletedEvent {
    export type AsObject = {
        metadata?: DiscoverMetadata.AsObject,
        resource?: DiscoverResourceMetadata.AsObject,
        status?: DiscoverStepStatus.AsObject,
    }
}

export class RoleCreateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): RoleCreateEvent;

    getRoleName(): string;
    setRoleName(value: string): RoleCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RoleCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: RoleCreateEvent): RoleCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RoleCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RoleCreateEvent;
    static deserializeBinaryFromReader(message: RoleCreateEvent, reader: jspb.BinaryReader): RoleCreateEvent;
}

export namespace RoleCreateEvent {
    export type AsObject = {
        userName: string,
        roleName: string,
    }
}

export class BotCreateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): BotCreateEvent;

    getBotUserName(): string;
    setBotUserName(value: string): BotCreateEvent;

    getRoleName(): string;
    setRoleName(value: string): BotCreateEvent;

    getRoleCount(): number;
    setRoleCount(value: number): BotCreateEvent;

    getJoinMethod(): string;
    setJoinMethod(value: string): BotCreateEvent;

    getBotName(): string;
    setBotName(value: string): BotCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BotCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: BotCreateEvent): BotCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BotCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BotCreateEvent;
    static deserializeBinaryFromReader(message: BotCreateEvent, reader: jspb.BinaryReader): BotCreateEvent;
}

export namespace BotCreateEvent {
    export type AsObject = {
        userName: string,
        botUserName: string,
        roleName: string,
        roleCount: number,
        joinMethod: string,
        botName: string,
    }
}

export class BotJoinEvent extends jspb.Message { 
    getBotName(): string;
    setBotName(value: string): BotJoinEvent;

    getJoinMethod(): string;
    setJoinMethod(value: string): BotJoinEvent;

    getJoinTokenName(): string;
    setJoinTokenName(value: string): BotJoinEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BotJoinEvent.AsObject;
    static toObject(includeInstance: boolean, msg: BotJoinEvent): BotJoinEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BotJoinEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BotJoinEvent;
    static deserializeBinaryFromReader(message: BotJoinEvent, reader: jspb.BinaryReader): BotJoinEvent;
}

export namespace BotJoinEvent {
    export type AsObject = {
        botName: string,
        joinMethod: string,
        joinTokenName: string,
    }
}

export class UICreateNewRoleClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UICreateNewRoleClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UICreateNewRoleClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UICreateNewRoleClickEvent): UICreateNewRoleClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UICreateNewRoleClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UICreateNewRoleClickEvent;
    static deserializeBinaryFromReader(message: UICreateNewRoleClickEvent, reader: jspb.BinaryReader): UICreateNewRoleClickEvent;
}

export namespace UICreateNewRoleClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UICreateNewRoleSaveClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UICreateNewRoleSaveClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UICreateNewRoleSaveClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UICreateNewRoleSaveClickEvent): UICreateNewRoleSaveClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UICreateNewRoleSaveClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UICreateNewRoleSaveClickEvent;
    static deserializeBinaryFromReader(message: UICreateNewRoleSaveClickEvent, reader: jspb.BinaryReader): UICreateNewRoleSaveClickEvent;
}

export namespace UICreateNewRoleSaveClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UICreateNewRoleCancelClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UICreateNewRoleCancelClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UICreateNewRoleCancelClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UICreateNewRoleCancelClickEvent): UICreateNewRoleCancelClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UICreateNewRoleCancelClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UICreateNewRoleCancelClickEvent;
    static deserializeBinaryFromReader(message: UICreateNewRoleCancelClickEvent, reader: jspb.BinaryReader): UICreateNewRoleCancelClickEvent;
}

export namespace UICreateNewRoleCancelClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UICreateNewRoleViewDocumentationClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UICreateNewRoleViewDocumentationClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UICreateNewRoleViewDocumentationClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UICreateNewRoleViewDocumentationClickEvent): UICreateNewRoleViewDocumentationClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UICreateNewRoleViewDocumentationClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UICreateNewRoleViewDocumentationClickEvent;
    static deserializeBinaryFromReader(message: UICreateNewRoleViewDocumentationClickEvent, reader: jspb.BinaryReader): UICreateNewRoleViewDocumentationClickEvent;
}

export namespace UICreateNewRoleViewDocumentationClickEvent {
    export type AsObject = {
        userName: string,
    }
}

export class UICallToActionClickEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): UICallToActionClickEvent;

    getCta(): CTA;
    setCta(value: CTA): UICallToActionClickEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UICallToActionClickEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UICallToActionClickEvent): UICallToActionClickEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UICallToActionClickEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UICallToActionClickEvent;
    static deserializeBinaryFromReader(message: UICallToActionClickEvent, reader: jspb.BinaryReader): UICallToActionClickEvent;
}

export namespace UICallToActionClickEvent {
    export type AsObject = {
        userName: string,
        cta: CTA,
    }
}

export class KubeRequestEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): KubeRequestEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KubeRequestEvent.AsObject;
    static toObject(includeInstance: boolean, msg: KubeRequestEvent): KubeRequestEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KubeRequestEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KubeRequestEvent;
    static deserializeBinaryFromReader(message: KubeRequestEvent, reader: jspb.BinaryReader): KubeRequestEvent;
}

export namespace KubeRequestEvent {
    export type AsObject = {
        userName: string,
    }
}

export class SFTPEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): SFTPEvent;

    getAction(): number;
    setAction(value: number): SFTPEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SFTPEvent.AsObject;
    static toObject(includeInstance: boolean, msg: SFTPEvent): SFTPEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SFTPEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SFTPEvent;
    static deserializeBinaryFromReader(message: SFTPEvent, reader: jspb.BinaryReader): SFTPEvent;
}

export namespace SFTPEvent {
    export type AsObject = {
        userName: string,
        action: number,
    }
}

export class AgentMetadataEvent extends jspb.Message { 
    getVersion(): string;
    setVersion(value: string): AgentMetadataEvent;

    getHostId(): string;
    setHostId(value: string): AgentMetadataEvent;

    clearServicesList(): void;
    getServicesList(): Array<string>;
    setServicesList(value: Array<string>): AgentMetadataEvent;
    addServices(value: string, index?: number): string;

    getOs(): string;
    setOs(value: string): AgentMetadataEvent;

    getOsVersion(): string;
    setOsVersion(value: string): AgentMetadataEvent;

    getHostArchitecture(): string;
    setHostArchitecture(value: string): AgentMetadataEvent;

    getGlibcVersion(): string;
    setGlibcVersion(value: string): AgentMetadataEvent;

    clearInstallMethodsList(): void;
    getInstallMethodsList(): Array<string>;
    setInstallMethodsList(value: Array<string>): AgentMetadataEvent;
    addInstallMethods(value: string, index?: number): string;

    getContainerRuntime(): string;
    setContainerRuntime(value: string): AgentMetadataEvent;

    getContainerOrchestrator(): string;
    setContainerOrchestrator(value: string): AgentMetadataEvent;

    getCloudEnvironment(): string;
    setCloudEnvironment(value: string): AgentMetadataEvent;

    getExternalUpgrader(): string;
    setExternalUpgrader(value: string): AgentMetadataEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AgentMetadataEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AgentMetadataEvent): AgentMetadataEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AgentMetadataEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AgentMetadataEvent;
    static deserializeBinaryFromReader(message: AgentMetadataEvent, reader: jspb.BinaryReader): AgentMetadataEvent;
}

export namespace AgentMetadataEvent {
    export type AsObject = {
        version: string,
        hostId: string,
        servicesList: Array<string>,
        os: string,
        osVersion: string,
        hostArchitecture: string,
        glibcVersion: string,
        installMethodsList: Array<string>,
        containerRuntime: string,
        containerOrchestrator: string,
        cloudEnvironment: string,
        externalUpgrader: string,
    }
}

export class AssistCompletionEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AssistCompletionEvent;

    getConversationId(): string;
    setConversationId(value: string): AssistCompletionEvent;

    getTotalTokens(): number;
    setTotalTokens(value: number): AssistCompletionEvent;

    getPromptTokens(): number;
    setPromptTokens(value: number): AssistCompletionEvent;

    getCompletionTokens(): number;
    setCompletionTokens(value: number): AssistCompletionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistCompletionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AssistCompletionEvent): AssistCompletionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistCompletionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistCompletionEvent;
    static deserializeBinaryFromReader(message: AssistCompletionEvent, reader: jspb.BinaryReader): AssistCompletionEvent;
}

export namespace AssistCompletionEvent {
    export type AsObject = {
        userName: string,
        conversationId: string,
        totalTokens: number,
        promptTokens: number,
        completionTokens: number,
    }
}

export class AssistExecutionEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AssistExecutionEvent;

    getConversationId(): string;
    setConversationId(value: string): AssistExecutionEvent;

    getNodeCount(): number;
    setNodeCount(value: number): AssistExecutionEvent;

    getTotalTokens(): number;
    setTotalTokens(value: number): AssistExecutionEvent;

    getPromptTokens(): number;
    setPromptTokens(value: number): AssistExecutionEvent;

    getCompletionTokens(): number;
    setCompletionTokens(value: number): AssistExecutionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistExecutionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AssistExecutionEvent): AssistExecutionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistExecutionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistExecutionEvent;
    static deserializeBinaryFromReader(message: AssistExecutionEvent, reader: jspb.BinaryReader): AssistExecutionEvent;
}

export namespace AssistExecutionEvent {
    export type AsObject = {
        userName: string,
        conversationId: string,
        nodeCount: number,
        totalTokens: number,
        promptTokens: number,
        completionTokens: number,
    }
}

export class AssistNewConversationEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AssistNewConversationEvent;

    getCategory(): string;
    setCategory(value: string): AssistNewConversationEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistNewConversationEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AssistNewConversationEvent): AssistNewConversationEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistNewConversationEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistNewConversationEvent;
    static deserializeBinaryFromReader(message: AssistNewConversationEvent, reader: jspb.BinaryReader): AssistNewConversationEvent;
}

export namespace AssistNewConversationEvent {
    export type AsObject = {
        userName: string,
        category: string,
    }
}

export class AssistAccessRequestEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AssistAccessRequestEvent;

    getResourceType(): string;
    setResourceType(value: string): AssistAccessRequestEvent;

    getTotalTokens(): number;
    setTotalTokens(value: number): AssistAccessRequestEvent;

    getPromptTokens(): number;
    setPromptTokens(value: number): AssistAccessRequestEvent;

    getCompletionTokens(): number;
    setCompletionTokens(value: number): AssistAccessRequestEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistAccessRequestEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AssistAccessRequestEvent): AssistAccessRequestEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistAccessRequestEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistAccessRequestEvent;
    static deserializeBinaryFromReader(message: AssistAccessRequestEvent, reader: jspb.BinaryReader): AssistAccessRequestEvent;
}

export namespace AssistAccessRequestEvent {
    export type AsObject = {
        userName: string,
        resourceType: string,
        totalTokens: number,
        promptTokens: number,
        completionTokens: number,
    }
}

export class AssistActionEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AssistActionEvent;

    getAction(): string;
    setAction(value: string): AssistActionEvent;

    getTotalTokens(): number;
    setTotalTokens(value: number): AssistActionEvent;

    getPromptTokens(): number;
    setPromptTokens(value: number): AssistActionEvent;

    getCompletionTokens(): number;
    setCompletionTokens(value: number): AssistActionEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssistActionEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AssistActionEvent): AssistActionEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssistActionEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssistActionEvent;
    static deserializeBinaryFromReader(message: AssistActionEvent, reader: jspb.BinaryReader): AssistActionEvent;
}

export namespace AssistActionEvent {
    export type AsObject = {
        userName: string,
        action: string,
        totalTokens: number,
        promptTokens: number,
        completionTokens: number,
    }
}

export class AccessListMetadata extends jspb.Message { 
    getId(): string;
    setId(value: string): AccessListMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListMetadata): AccessListMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListMetadata;
    static deserializeBinaryFromReader(message: AccessListMetadata, reader: jspb.BinaryReader): AccessListMetadata;
}

export namespace AccessListMetadata {
    export type AsObject = {
        id: string,
    }
}

export class AccessListCreateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListCreateEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListCreateEvent): AccessListCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListCreateEvent;
    static deserializeBinaryFromReader(message: AccessListCreateEvent, reader: jspb.BinaryReader): AccessListCreateEvent;
}

export namespace AccessListCreateEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListUpdateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListUpdateEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListUpdateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListUpdateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListUpdateEvent): AccessListUpdateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListUpdateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListUpdateEvent;
    static deserializeBinaryFromReader(message: AccessListUpdateEvent, reader: jspb.BinaryReader): AccessListUpdateEvent;
}

export namespace AccessListUpdateEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListDeleteEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListDeleteEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListDeleteEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListDeleteEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListDeleteEvent): AccessListDeleteEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListDeleteEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListDeleteEvent;
    static deserializeBinaryFromReader(message: AccessListDeleteEvent, reader: jspb.BinaryReader): AccessListDeleteEvent;
}

export namespace AccessListDeleteEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListMemberCreateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListMemberCreateEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListMemberCreateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListMemberCreateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListMemberCreateEvent): AccessListMemberCreateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListMemberCreateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListMemberCreateEvent;
    static deserializeBinaryFromReader(message: AccessListMemberCreateEvent, reader: jspb.BinaryReader): AccessListMemberCreateEvent;
}

export namespace AccessListMemberCreateEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListMemberUpdateEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListMemberUpdateEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListMemberUpdateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListMemberUpdateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListMemberUpdateEvent): AccessListMemberUpdateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListMemberUpdateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListMemberUpdateEvent;
    static deserializeBinaryFromReader(message: AccessListMemberUpdateEvent, reader: jspb.BinaryReader): AccessListMemberUpdateEvent;
}

export namespace AccessListMemberUpdateEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListMemberDeleteEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListMemberDeleteEvent;


    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): AccessListMetadata | undefined;
    setMetadata(value?: AccessListMetadata): AccessListMemberDeleteEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListMemberDeleteEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListMemberDeleteEvent): AccessListMemberDeleteEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListMemberDeleteEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListMemberDeleteEvent;
    static deserializeBinaryFromReader(message: AccessListMemberDeleteEvent, reader: jspb.BinaryReader): AccessListMemberDeleteEvent;
}

export namespace AccessListMemberDeleteEvent {
    export type AsObject = {
        userName: string,
        metadata?: AccessListMetadata.AsObject,
    }
}

export class AccessListGrantsToUserEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): AccessListGrantsToUserEvent;

    getCountRolesGranted(): number;
    setCountRolesGranted(value: number): AccessListGrantsToUserEvent;

    getCountTraitsGranted(): number;
    setCountTraitsGranted(value: number): AccessListGrantsToUserEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessListGrantsToUserEvent.AsObject;
    static toObject(includeInstance: boolean, msg: AccessListGrantsToUserEvent): AccessListGrantsToUserEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessListGrantsToUserEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessListGrantsToUserEvent;
    static deserializeBinaryFromReader(message: AccessListGrantsToUserEvent, reader: jspb.BinaryReader): AccessListGrantsToUserEvent;
}

export namespace AccessListGrantsToUserEvent {
    export type AsObject = {
        userName: string,
        countRolesGranted: number,
        countTraitsGranted: number,
    }
}

export class IntegrationEnrollMetadata extends jspb.Message { 
    getId(): string;
    setId(value: string): IntegrationEnrollMetadata;

    getKind(): IntegrationEnrollKind;
    setKind(value: IntegrationEnrollKind): IntegrationEnrollMetadata;

    getUserName(): string;
    setUserName(value: string): IntegrationEnrollMetadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IntegrationEnrollMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: IntegrationEnrollMetadata): IntegrationEnrollMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IntegrationEnrollMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IntegrationEnrollMetadata;
    static deserializeBinaryFromReader(message: IntegrationEnrollMetadata, reader: jspb.BinaryReader): IntegrationEnrollMetadata;
}

export namespace IntegrationEnrollMetadata {
    export type AsObject = {
        id: string,
        kind: IntegrationEnrollKind,
        userName: string,
    }
}

export class UIIntegrationEnrollStartEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): IntegrationEnrollMetadata | undefined;
    setMetadata(value?: IntegrationEnrollMetadata): UIIntegrationEnrollStartEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIIntegrationEnrollStartEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIIntegrationEnrollStartEvent): UIIntegrationEnrollStartEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIIntegrationEnrollStartEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIIntegrationEnrollStartEvent;
    static deserializeBinaryFromReader(message: UIIntegrationEnrollStartEvent, reader: jspb.BinaryReader): UIIntegrationEnrollStartEvent;
}

export namespace UIIntegrationEnrollStartEvent {
    export type AsObject = {
        metadata?: IntegrationEnrollMetadata.AsObject,
    }
}

export class UIIntegrationEnrollCompleteEvent extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): IntegrationEnrollMetadata | undefined;
    setMetadata(value?: IntegrationEnrollMetadata): UIIntegrationEnrollCompleteEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIIntegrationEnrollCompleteEvent.AsObject;
    static toObject(includeInstance: boolean, msg: UIIntegrationEnrollCompleteEvent): UIIntegrationEnrollCompleteEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIIntegrationEnrollCompleteEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIIntegrationEnrollCompleteEvent;
    static deserializeBinaryFromReader(message: UIIntegrationEnrollCompleteEvent, reader: jspb.BinaryReader): UIIntegrationEnrollCompleteEvent;
}

export namespace UIIntegrationEnrollCompleteEvent {
    export type AsObject = {
        metadata?: IntegrationEnrollMetadata.AsObject,
    }
}

export class EditorChangeEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): EditorChangeEvent;

    getStatus(): EditorChangeStatus;
    setStatus(value: EditorChangeStatus): EditorChangeEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EditorChangeEvent.AsObject;
    static toObject(includeInstance: boolean, msg: EditorChangeEvent): EditorChangeEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EditorChangeEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EditorChangeEvent;
    static deserializeBinaryFromReader(message: EditorChangeEvent, reader: jspb.BinaryReader): EditorChangeEvent;
}

export namespace EditorChangeEvent {
    export type AsObject = {
        userName: string,
        status: EditorChangeStatus,
    }
}

export class DeviceAuthenticateEvent extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceAuthenticateEvent;

    getUserName(): string;
    setUserName(value: string): DeviceAuthenticateEvent;

    getDeviceOsType(): string;
    setDeviceOsType(value: string): DeviceAuthenticateEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceAuthenticateEvent.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceAuthenticateEvent): DeviceAuthenticateEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceAuthenticateEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceAuthenticateEvent;
    static deserializeBinaryFromReader(message: DeviceAuthenticateEvent, reader: jspb.BinaryReader): DeviceAuthenticateEvent;
}

export namespace DeviceAuthenticateEvent {
    export type AsObject = {
        deviceId: string,
        userName: string,
        deviceOsType: string,
    }
}

export class DeviceEnrollEvent extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceEnrollEvent;

    getUserName(): string;
    setUserName(value: string): DeviceEnrollEvent;

    getDeviceOsType(): string;
    setDeviceOsType(value: string): DeviceEnrollEvent;

    getDeviceOrigin(): string;
    setDeviceOrigin(value: string): DeviceEnrollEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceEnrollEvent.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceEnrollEvent): DeviceEnrollEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceEnrollEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceEnrollEvent;
    static deserializeBinaryFromReader(message: DeviceEnrollEvent, reader: jspb.BinaryReader): DeviceEnrollEvent;
}

export namespace DeviceEnrollEvent {
    export type AsObject = {
        deviceId: string,
        userName: string,
        deviceOsType: string,
        deviceOrigin: string,
    }
}

export class FeatureRecommendationEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): FeatureRecommendationEvent;

    getFeature(): Feature;
    setFeature(value: Feature): FeatureRecommendationEvent;

    getFeatureRecommendationStatus(): FeatureRecommendationStatus;
    setFeatureRecommendationStatus(value: FeatureRecommendationStatus): FeatureRecommendationEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FeatureRecommendationEvent.AsObject;
    static toObject(includeInstance: boolean, msg: FeatureRecommendationEvent): FeatureRecommendationEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FeatureRecommendationEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FeatureRecommendationEvent;
    static deserializeBinaryFromReader(message: FeatureRecommendationEvent, reader: jspb.BinaryReader): FeatureRecommendationEvent;
}

export namespace FeatureRecommendationEvent {
    export type AsObject = {
        userName: string,
        feature: Feature,
        featureRecommendationStatus: FeatureRecommendationStatus,
    }
}

export class LicenseLimitEvent extends jspb.Message { 
    getLicenseLimit(): LicenseLimit;
    setLicenseLimit(value: LicenseLimit): LicenseLimitEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LicenseLimitEvent.AsObject;
    static toObject(includeInstance: boolean, msg: LicenseLimitEvent): LicenseLimitEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LicenseLimitEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LicenseLimitEvent;
    static deserializeBinaryFromReader(message: LicenseLimitEvent, reader: jspb.BinaryReader): LicenseLimitEvent;
}

export namespace LicenseLimitEvent {
    export type AsObject = {
        licenseLimit: LicenseLimit,
    }
}

export class DesktopDirectoryShareEvent extends jspb.Message { 
    getDesktop(): string;
    setDesktop(value: string): DesktopDirectoryShareEvent;

    getUserName(): string;
    setUserName(value: string): DesktopDirectoryShareEvent;

    getDirectoryName(): string;
    setDirectoryName(value: string): DesktopDirectoryShareEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DesktopDirectoryShareEvent.AsObject;
    static toObject(includeInstance: boolean, msg: DesktopDirectoryShareEvent): DesktopDirectoryShareEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DesktopDirectoryShareEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DesktopDirectoryShareEvent;
    static deserializeBinaryFromReader(message: DesktopDirectoryShareEvent, reader: jspb.BinaryReader): DesktopDirectoryShareEvent;
}

export namespace DesktopDirectoryShareEvent {
    export type AsObject = {
        desktop: string,
        userName: string,
        directoryName: string,
    }
}

export class DesktopClipboardEvent extends jspb.Message { 
    getDesktop(): string;
    setDesktop(value: string): DesktopClipboardEvent;

    getUserName(): string;
    setUserName(value: string): DesktopClipboardEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DesktopClipboardEvent.AsObject;
    static toObject(includeInstance: boolean, msg: DesktopClipboardEvent): DesktopClipboardEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DesktopClipboardEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DesktopClipboardEvent;
    static deserializeBinaryFromReader(message: DesktopClipboardEvent, reader: jspb.BinaryReader): DesktopClipboardEvent;
}

export namespace DesktopClipboardEvent {
    export type AsObject = {
        desktop: string,
        userName: string,
    }
}

export class TAGExecuteQueryEvent extends jspb.Message { 
    getUserName(): string;
    setUserName(value: string): TAGExecuteQueryEvent;

    getTotalNodes(): number;
    setTotalNodes(value: number): TAGExecuteQueryEvent;

    getTotalEdges(): number;
    setTotalEdges(value: number): TAGExecuteQueryEvent;

    getIsSuccess(): boolean;
    setIsSuccess(value: boolean): TAGExecuteQueryEvent;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TAGExecuteQueryEvent.AsObject;
    static toObject(includeInstance: boolean, msg: TAGExecuteQueryEvent): TAGExecuteQueryEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TAGExecuteQueryEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TAGExecuteQueryEvent;
    static deserializeBinaryFromReader(message: TAGExecuteQueryEvent, reader: jspb.BinaryReader): TAGExecuteQueryEvent;
}

export namespace TAGExecuteQueryEvent {
    export type AsObject = {
        userName: string,
        totalNodes: number,
        totalEdges: number,
        isSuccess: boolean,
    }
}

export class SubmitEventRequest extends jspb.Message { 
    getClusterName(): string;
    setClusterName(value: string): SubmitEventRequest;


    hasTimestamp(): boolean;
    clearTimestamp(): void;
    getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): SubmitEventRequest;


    hasUserLogin(): boolean;
    clearUserLogin(): void;
    getUserLogin(): UserLoginEvent | undefined;
    setUserLogin(value?: UserLoginEvent): SubmitEventRequest;


    hasSsoCreate(): boolean;
    clearSsoCreate(): void;
    getSsoCreate(): SSOCreateEvent | undefined;
    setSsoCreate(value?: SSOCreateEvent): SubmitEventRequest;


    hasResourceCreate(): boolean;
    clearResourceCreate(): void;
    getResourceCreate(): ResourceCreateEvent | undefined;
    setResourceCreate(value?: ResourceCreateEvent): SubmitEventRequest;


    hasSessionStart(): boolean;
    clearSessionStart(): void;
    getSessionStart(): SessionStartEvent | undefined;
    setSessionStart(value?: SessionStartEvent): SubmitEventRequest;


    hasUiBannerClick(): boolean;
    clearUiBannerClick(): void;
    getUiBannerClick(): UIBannerClickEvent | undefined;
    setUiBannerClick(value?: UIBannerClickEvent): SubmitEventRequest;


    hasUiOnboardCompleteGoToDashboardClick(): boolean;
    clearUiOnboardCompleteGoToDashboardClick(): void;
    getUiOnboardCompleteGoToDashboardClick(): UIOnboardCompleteGoToDashboardClickEvent | undefined;
    setUiOnboardCompleteGoToDashboardClick(value?: UIOnboardCompleteGoToDashboardClickEvent): SubmitEventRequest;


    hasUiOnboardAddFirstResourceClick(): boolean;
    clearUiOnboardAddFirstResourceClick(): void;
    getUiOnboardAddFirstResourceClick(): UIOnboardAddFirstResourceClickEvent | undefined;
    setUiOnboardAddFirstResourceClick(value?: UIOnboardAddFirstResourceClickEvent): SubmitEventRequest;


    hasUiOnboardAddFirstResourceLaterClick(): boolean;
    clearUiOnboardAddFirstResourceLaterClick(): void;
    getUiOnboardAddFirstResourceLaterClick(): UIOnboardAddFirstResourceLaterClickEvent | undefined;
    setUiOnboardAddFirstResourceLaterClick(value?: UIOnboardAddFirstResourceLaterClickEvent): SubmitEventRequest;


    hasUiOnboardSetCredentialSubmit(): boolean;
    clearUiOnboardSetCredentialSubmit(): void;
    getUiOnboardSetCredentialSubmit(): UIOnboardSetCredentialSubmitEvent | undefined;
    setUiOnboardSetCredentialSubmit(value?: UIOnboardSetCredentialSubmitEvent): SubmitEventRequest;


    hasUiOnboardRegisterChallengeSubmit(): boolean;
    clearUiOnboardRegisterChallengeSubmit(): void;
    getUiOnboardRegisterChallengeSubmit(): UIOnboardRegisterChallengeSubmitEvent | undefined;
    setUiOnboardRegisterChallengeSubmit(value?: UIOnboardRegisterChallengeSubmitEvent): SubmitEventRequest;


    hasUiRecoveryCodesContinueClick(): boolean;
    clearUiRecoveryCodesContinueClick(): void;
    getUiRecoveryCodesContinueClick(): UIRecoveryCodesContinueClickEvent | undefined;
    setUiRecoveryCodesContinueClick(value?: UIRecoveryCodesContinueClickEvent): SubmitEventRequest;


    hasUiRecoveryCodesCopyClick(): boolean;
    clearUiRecoveryCodesCopyClick(): void;
    getUiRecoveryCodesCopyClick(): UIRecoveryCodesCopyClickEvent | undefined;
    setUiRecoveryCodesCopyClick(value?: UIRecoveryCodesCopyClickEvent): SubmitEventRequest;


    hasUiRecoveryCodesPrintClick(): boolean;
    clearUiRecoveryCodesPrintClick(): void;
    getUiRecoveryCodesPrintClick(): UIRecoveryCodesPrintClickEvent | undefined;
    setUiRecoveryCodesPrintClick(value?: UIRecoveryCodesPrintClickEvent): SubmitEventRequest;


    hasUiDiscoverStartedEvent(): boolean;
    clearUiDiscoverStartedEvent(): void;
    getUiDiscoverStartedEvent(): UIDiscoverStartedEvent | undefined;
    setUiDiscoverStartedEvent(value?: UIDiscoverStartedEvent): SubmitEventRequest;


    hasUiDiscoverResourceSelectionEvent(): boolean;
    clearUiDiscoverResourceSelectionEvent(): void;
    getUiDiscoverResourceSelectionEvent(): UIDiscoverResourceSelectionEvent | undefined;
    setUiDiscoverResourceSelectionEvent(value?: UIDiscoverResourceSelectionEvent): SubmitEventRequest;


    hasUserCertificateIssuedEvent(): boolean;
    clearUserCertificateIssuedEvent(): void;
    getUserCertificateIssuedEvent(): UserCertificateIssuedEvent | undefined;
    setUserCertificateIssuedEvent(value?: UserCertificateIssuedEvent): SubmitEventRequest;


    hasSessionStartV2(): boolean;
    clearSessionStartV2(): void;
    getSessionStartV2(): SessionStartEvent | undefined;
    setSessionStartV2(value?: SessionStartEvent): SubmitEventRequest;


    hasUiDiscoverDeployServiceEvent(): boolean;
    clearUiDiscoverDeployServiceEvent(): void;
    getUiDiscoverDeployServiceEvent(): UIDiscoverDeployServiceEvent | undefined;
    setUiDiscoverDeployServiceEvent(value?: UIDiscoverDeployServiceEvent): SubmitEventRequest;


    hasUiDiscoverDatabaseRegisterEvent(): boolean;
    clearUiDiscoverDatabaseRegisterEvent(): void;
    getUiDiscoverDatabaseRegisterEvent(): UIDiscoverDatabaseRegisterEvent | undefined;
    setUiDiscoverDatabaseRegisterEvent(value?: UIDiscoverDatabaseRegisterEvent): SubmitEventRequest;


    hasUiDiscoverDatabaseConfigureMtlsEvent(): boolean;
    clearUiDiscoverDatabaseConfigureMtlsEvent(): void;
    getUiDiscoverDatabaseConfigureMtlsEvent(): UIDiscoverDatabaseConfigureMTLSEvent | undefined;
    setUiDiscoverDatabaseConfigureMtlsEvent(value?: UIDiscoverDatabaseConfigureMTLSEvent): SubmitEventRequest;


    hasUiDiscoverDesktopActiveDirectoryToolsInstallEvent(): boolean;
    clearUiDiscoverDesktopActiveDirectoryToolsInstallEvent(): void;
    getUiDiscoverDesktopActiveDirectoryToolsInstallEvent(): UIDiscoverDesktopActiveDirectoryToolsInstallEvent | undefined;
    setUiDiscoverDesktopActiveDirectoryToolsInstallEvent(value?: UIDiscoverDesktopActiveDirectoryToolsInstallEvent): SubmitEventRequest;


    hasUiDiscoverDesktopActiveDirectoryConfigureEvent(): boolean;
    clearUiDiscoverDesktopActiveDirectoryConfigureEvent(): void;
    getUiDiscoverDesktopActiveDirectoryConfigureEvent(): UIDiscoverDesktopActiveDirectoryConfigureEvent | undefined;
    setUiDiscoverDesktopActiveDirectoryConfigureEvent(value?: UIDiscoverDesktopActiveDirectoryConfigureEvent): SubmitEventRequest;


    hasUiDiscoverAutoDiscoveredResourcesEvent(): boolean;
    clearUiDiscoverAutoDiscoveredResourcesEvent(): void;
    getUiDiscoverAutoDiscoveredResourcesEvent(): UIDiscoverAutoDiscoveredResourcesEvent | undefined;
    setUiDiscoverAutoDiscoveredResourcesEvent(value?: UIDiscoverAutoDiscoveredResourcesEvent): SubmitEventRequest;


    hasUiDiscoverDatabaseConfigureIamPolicyEvent(): boolean;
    clearUiDiscoverDatabaseConfigureIamPolicyEvent(): void;
    getUiDiscoverDatabaseConfigureIamPolicyEvent(): UIDiscoverDatabaseConfigureIAMPolicyEvent | undefined;
    setUiDiscoverDatabaseConfigureIamPolicyEvent(value?: UIDiscoverDatabaseConfigureIAMPolicyEvent): SubmitEventRequest;


    hasUiDiscoverPrincipalsConfigureEvent(): boolean;
    clearUiDiscoverPrincipalsConfigureEvent(): void;
    getUiDiscoverPrincipalsConfigureEvent(): UIDiscoverPrincipalsConfigureEvent | undefined;
    setUiDiscoverPrincipalsConfigureEvent(value?: UIDiscoverPrincipalsConfigureEvent): SubmitEventRequest;


    hasUiDiscoverTestConnectionEvent(): boolean;
    clearUiDiscoverTestConnectionEvent(): void;
    getUiDiscoverTestConnectionEvent(): UIDiscoverTestConnectionEvent | undefined;
    setUiDiscoverTestConnectionEvent(value?: UIDiscoverTestConnectionEvent): SubmitEventRequest;


    hasUiDiscoverCompletedEvent(): boolean;
    clearUiDiscoverCompletedEvent(): void;
    getUiDiscoverCompletedEvent(): UIDiscoverCompletedEvent | undefined;
    setUiDiscoverCompletedEvent(value?: UIDiscoverCompletedEvent): SubmitEventRequest;


    hasRoleCreate(): boolean;
    clearRoleCreate(): void;
    getRoleCreate(): RoleCreateEvent | undefined;
    setRoleCreate(value?: RoleCreateEvent): SubmitEventRequest;


    hasUiCreateNewRoleClick(): boolean;
    clearUiCreateNewRoleClick(): void;
    getUiCreateNewRoleClick(): UICreateNewRoleClickEvent | undefined;
    setUiCreateNewRoleClick(value?: UICreateNewRoleClickEvent): SubmitEventRequest;


    hasUiCreateNewRoleSaveClick(): boolean;
    clearUiCreateNewRoleSaveClick(): void;
    getUiCreateNewRoleSaveClick(): UICreateNewRoleSaveClickEvent | undefined;
    setUiCreateNewRoleSaveClick(value?: UICreateNewRoleSaveClickEvent): SubmitEventRequest;


    hasUiCreateNewRoleCancelClick(): boolean;
    clearUiCreateNewRoleCancelClick(): void;
    getUiCreateNewRoleCancelClick(): UICreateNewRoleCancelClickEvent | undefined;
    setUiCreateNewRoleCancelClick(value?: UICreateNewRoleCancelClickEvent): SubmitEventRequest;


    hasUiCreateNewRoleViewDocumentationClick(): boolean;
    clearUiCreateNewRoleViewDocumentationClick(): void;
    getUiCreateNewRoleViewDocumentationClick(): UICreateNewRoleViewDocumentationClickEvent | undefined;
    setUiCreateNewRoleViewDocumentationClick(value?: UICreateNewRoleViewDocumentationClickEvent): SubmitEventRequest;


    hasKubeRequest(): boolean;
    clearKubeRequest(): void;
    getKubeRequest(): KubeRequestEvent | undefined;
    setKubeRequest(value?: KubeRequestEvent): SubmitEventRequest;


    hasSftp(): boolean;
    clearSftp(): void;
    getSftp(): SFTPEvent | undefined;
    setSftp(value?: SFTPEvent): SubmitEventRequest;


    hasAgentMetadataEvent(): boolean;
    clearAgentMetadataEvent(): void;
    getAgentMetadataEvent(): AgentMetadataEvent | undefined;
    setAgentMetadataEvent(value?: AgentMetadataEvent): SubmitEventRequest;


    hasResourceHeartbeat(): boolean;
    clearResourceHeartbeat(): void;
    getResourceHeartbeat(): ResourceHeartbeatEvent | undefined;
    setResourceHeartbeat(value?: ResourceHeartbeatEvent): SubmitEventRequest;


    hasUiDiscoverIntegrationAwsOidcConnectEvent(): boolean;
    clearUiDiscoverIntegrationAwsOidcConnectEvent(): void;
    getUiDiscoverIntegrationAwsOidcConnectEvent(): UIDiscoverIntegrationAWSOIDCConnectEvent | undefined;
    setUiDiscoverIntegrationAwsOidcConnectEvent(value?: UIDiscoverIntegrationAWSOIDCConnectEvent): SubmitEventRequest;


    hasUiDiscoverDatabaseRdsEnrollEvent(): boolean;
    clearUiDiscoverDatabaseRdsEnrollEvent(): void;
    getUiDiscoverDatabaseRdsEnrollEvent(): UIDiscoverDatabaseRDSEnrollEvent | undefined;
    setUiDiscoverDatabaseRdsEnrollEvent(value?: UIDiscoverDatabaseRDSEnrollEvent): SubmitEventRequest;


    hasUiCallToActionClickEvent(): boolean;
    clearUiCallToActionClickEvent(): void;
    getUiCallToActionClickEvent(): UICallToActionClickEvent | undefined;
    setUiCallToActionClickEvent(value?: UICallToActionClickEvent): SubmitEventRequest;


    hasAssistCompletion(): boolean;
    clearAssistCompletion(): void;
    getAssistCompletion(): AssistCompletionEvent | undefined;
    setAssistCompletion(value?: AssistCompletionEvent): SubmitEventRequest;


    hasUiIntegrationEnrollStartEvent(): boolean;
    clearUiIntegrationEnrollStartEvent(): void;
    getUiIntegrationEnrollStartEvent(): UIIntegrationEnrollStartEvent | undefined;
    setUiIntegrationEnrollStartEvent(value?: UIIntegrationEnrollStartEvent): SubmitEventRequest;


    hasUiIntegrationEnrollCompleteEvent(): boolean;
    clearUiIntegrationEnrollCompleteEvent(): void;
    getUiIntegrationEnrollCompleteEvent(): UIIntegrationEnrollCompleteEvent | undefined;
    setUiIntegrationEnrollCompleteEvent(value?: UIIntegrationEnrollCompleteEvent): SubmitEventRequest;


    hasEditorChangeEvent(): boolean;
    clearEditorChangeEvent(): void;
    getEditorChangeEvent(): EditorChangeEvent | undefined;
    setEditorChangeEvent(value?: EditorChangeEvent): SubmitEventRequest;


    hasBotCreate(): boolean;
    clearBotCreate(): void;
    getBotCreate(): BotCreateEvent | undefined;
    setBotCreate(value?: BotCreateEvent): SubmitEventRequest;


    hasUiOnboardQuestionnaireSubmit(): boolean;
    clearUiOnboardQuestionnaireSubmit(): void;
    getUiOnboardQuestionnaireSubmit(): UIOnboardQuestionnaireSubmitEvent | undefined;
    setUiOnboardQuestionnaireSubmit(value?: UIOnboardQuestionnaireSubmitEvent): SubmitEventRequest;


    hasBotJoin(): boolean;
    clearBotJoin(): void;
    getBotJoin(): BotJoinEvent | undefined;
    setBotJoin(value?: BotJoinEvent): SubmitEventRequest;


    hasAssistExecution(): boolean;
    clearAssistExecution(): void;
    getAssistExecution(): AssistExecutionEvent | undefined;
    setAssistExecution(value?: AssistExecutionEvent): SubmitEventRequest;


    hasAssistNewConversation(): boolean;
    clearAssistNewConversation(): void;
    getAssistNewConversation(): AssistNewConversationEvent | undefined;
    setAssistNewConversation(value?: AssistNewConversationEvent): SubmitEventRequest;


    hasDeviceAuthenticateEvent(): boolean;
    clearDeviceAuthenticateEvent(): void;
    getDeviceAuthenticateEvent(): DeviceAuthenticateEvent | undefined;
    setDeviceAuthenticateEvent(value?: DeviceAuthenticateEvent): SubmitEventRequest;


    hasFeatureRecommendationEvent(): boolean;
    clearFeatureRecommendationEvent(): void;
    getFeatureRecommendationEvent(): FeatureRecommendationEvent | undefined;
    setFeatureRecommendationEvent(value?: FeatureRecommendationEvent): SubmitEventRequest;


    hasAssistAccessRequest(): boolean;
    clearAssistAccessRequest(): void;
    getAssistAccessRequest(): AssistAccessRequestEvent | undefined;
    setAssistAccessRequest(value?: AssistAccessRequestEvent): SubmitEventRequest;


    hasAssistAction(): boolean;
    clearAssistAction(): void;
    getAssistAction(): AssistActionEvent | undefined;
    setAssistAction(value?: AssistActionEvent): SubmitEventRequest;


    hasDeviceEnrollEvent(): boolean;
    clearDeviceEnrollEvent(): void;
    getDeviceEnrollEvent(): DeviceEnrollEvent | undefined;
    setDeviceEnrollEvent(value?: DeviceEnrollEvent): SubmitEventRequest;


    hasLicenseLimitEvent(): boolean;
    clearLicenseLimitEvent(): void;
    getLicenseLimitEvent(): LicenseLimitEvent | undefined;
    setLicenseLimitEvent(value?: LicenseLimitEvent): SubmitEventRequest;


    hasAccessListCreate(): boolean;
    clearAccessListCreate(): void;
    getAccessListCreate(): AccessListCreateEvent | undefined;
    setAccessListCreate(value?: AccessListCreateEvent): SubmitEventRequest;


    hasAccessListUpdate(): boolean;
    clearAccessListUpdate(): void;
    getAccessListUpdate(): AccessListUpdateEvent | undefined;
    setAccessListUpdate(value?: AccessListUpdateEvent): SubmitEventRequest;


    hasAccessListDelete(): boolean;
    clearAccessListDelete(): void;
    getAccessListDelete(): AccessListDeleteEvent | undefined;
    setAccessListDelete(value?: AccessListDeleteEvent): SubmitEventRequest;


    hasAccessListMemberCreate(): boolean;
    clearAccessListMemberCreate(): void;
    getAccessListMemberCreate(): AccessListMemberCreateEvent | undefined;
    setAccessListMemberCreate(value?: AccessListMemberCreateEvent): SubmitEventRequest;


    hasAccessListMemberUpdate(): boolean;
    clearAccessListMemberUpdate(): void;
    getAccessListMemberUpdate(): AccessListMemberUpdateEvent | undefined;
    setAccessListMemberUpdate(value?: AccessListMemberUpdateEvent): SubmitEventRequest;


    hasAccessListMemberDelete(): boolean;
    clearAccessListMemberDelete(): void;
    getAccessListMemberDelete(): AccessListMemberDeleteEvent | undefined;
    setAccessListMemberDelete(value?: AccessListMemberDeleteEvent): SubmitEventRequest;


    hasAccessListGrantsToUser(): boolean;
    clearAccessListGrantsToUser(): void;
    getAccessListGrantsToUser(): AccessListGrantsToUserEvent | undefined;
    setAccessListGrantsToUser(value?: AccessListGrantsToUserEvent): SubmitEventRequest;


    hasUiDiscoverEc2InstanceSelection(): boolean;
    clearUiDiscoverEc2InstanceSelection(): void;
    getUiDiscoverEc2InstanceSelection(): UIDiscoverEC2InstanceSelectionEvent | undefined;
    setUiDiscoverEc2InstanceSelection(value?: UIDiscoverEC2InstanceSelectionEvent): SubmitEventRequest;


    hasUiDiscoverDeployEice(): boolean;
    clearUiDiscoverDeployEice(): void;
    getUiDiscoverDeployEice(): UIDiscoverDeployEICEEvent | undefined;
    setUiDiscoverDeployEice(value?: UIDiscoverDeployEICEEvent): SubmitEventRequest;


    hasUiDiscoverCreateNode(): boolean;
    clearUiDiscoverCreateNode(): void;
    getUiDiscoverCreateNode(): UIDiscoverCreateNodeEvent | undefined;
    setUiDiscoverCreateNode(value?: UIDiscoverCreateNodeEvent): SubmitEventRequest;


    hasDesktopDirectoryShare(): boolean;
    clearDesktopDirectoryShare(): void;
    getDesktopDirectoryShare(): DesktopDirectoryShareEvent | undefined;
    setDesktopDirectoryShare(value?: DesktopDirectoryShareEvent): SubmitEventRequest;


    hasDesktopClipboardTransfer(): boolean;
    clearDesktopClipboardTransfer(): void;
    getDesktopClipboardTransfer(): DesktopClipboardEvent | undefined;
    setDesktopClipboardTransfer(value?: DesktopClipboardEvent): SubmitEventRequest;


    hasTagExecuteQuery(): boolean;
    clearTagExecuteQuery(): void;
    getTagExecuteQuery(): TAGExecuteQueryEvent | undefined;
    setTagExecuteQuery(value?: TAGExecuteQueryEvent): SubmitEventRequest;


    getEventCase(): SubmitEventRequest.EventCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitEventRequest): SubmitEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitEventRequest;
    static deserializeBinaryFromReader(message: SubmitEventRequest, reader: jspb.BinaryReader): SubmitEventRequest;
}

export namespace SubmitEventRequest {
    export type AsObject = {
        clusterName: string,
        timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        userLogin?: UserLoginEvent.AsObject,
        ssoCreate?: SSOCreateEvent.AsObject,
        resourceCreate?: ResourceCreateEvent.AsObject,
        sessionStart?: SessionStartEvent.AsObject,
        uiBannerClick?: UIBannerClickEvent.AsObject,
        uiOnboardCompleteGoToDashboardClick?: UIOnboardCompleteGoToDashboardClickEvent.AsObject,
        uiOnboardAddFirstResourceClick?: UIOnboardAddFirstResourceClickEvent.AsObject,
        uiOnboardAddFirstResourceLaterClick?: UIOnboardAddFirstResourceLaterClickEvent.AsObject,
        uiOnboardSetCredentialSubmit?: UIOnboardSetCredentialSubmitEvent.AsObject,
        uiOnboardRegisterChallengeSubmit?: UIOnboardRegisterChallengeSubmitEvent.AsObject,
        uiRecoveryCodesContinueClick?: UIRecoveryCodesContinueClickEvent.AsObject,
        uiRecoveryCodesCopyClick?: UIRecoveryCodesCopyClickEvent.AsObject,
        uiRecoveryCodesPrintClick?: UIRecoveryCodesPrintClickEvent.AsObject,
        uiDiscoverStartedEvent?: UIDiscoverStartedEvent.AsObject,
        uiDiscoverResourceSelectionEvent?: UIDiscoverResourceSelectionEvent.AsObject,
        userCertificateIssuedEvent?: UserCertificateIssuedEvent.AsObject,
        sessionStartV2?: SessionStartEvent.AsObject,
        uiDiscoverDeployServiceEvent?: UIDiscoverDeployServiceEvent.AsObject,
        uiDiscoverDatabaseRegisterEvent?: UIDiscoverDatabaseRegisterEvent.AsObject,
        uiDiscoverDatabaseConfigureMtlsEvent?: UIDiscoverDatabaseConfigureMTLSEvent.AsObject,
        uiDiscoverDesktopActiveDirectoryToolsInstallEvent?: UIDiscoverDesktopActiveDirectoryToolsInstallEvent.AsObject,
        uiDiscoverDesktopActiveDirectoryConfigureEvent?: UIDiscoverDesktopActiveDirectoryConfigureEvent.AsObject,
        uiDiscoverAutoDiscoveredResourcesEvent?: UIDiscoverAutoDiscoveredResourcesEvent.AsObject,
        uiDiscoverDatabaseConfigureIamPolicyEvent?: UIDiscoverDatabaseConfigureIAMPolicyEvent.AsObject,
        uiDiscoverPrincipalsConfigureEvent?: UIDiscoverPrincipalsConfigureEvent.AsObject,
        uiDiscoverTestConnectionEvent?: UIDiscoverTestConnectionEvent.AsObject,
        uiDiscoverCompletedEvent?: UIDiscoverCompletedEvent.AsObject,
        roleCreate?: RoleCreateEvent.AsObject,
        uiCreateNewRoleClick?: UICreateNewRoleClickEvent.AsObject,
        uiCreateNewRoleSaveClick?: UICreateNewRoleSaveClickEvent.AsObject,
        uiCreateNewRoleCancelClick?: UICreateNewRoleCancelClickEvent.AsObject,
        uiCreateNewRoleViewDocumentationClick?: UICreateNewRoleViewDocumentationClickEvent.AsObject,
        kubeRequest?: KubeRequestEvent.AsObject,
        sftp?: SFTPEvent.AsObject,
        agentMetadataEvent?: AgentMetadataEvent.AsObject,
        resourceHeartbeat?: ResourceHeartbeatEvent.AsObject,
        uiDiscoverIntegrationAwsOidcConnectEvent?: UIDiscoverIntegrationAWSOIDCConnectEvent.AsObject,
        uiDiscoverDatabaseRdsEnrollEvent?: UIDiscoverDatabaseRDSEnrollEvent.AsObject,
        uiCallToActionClickEvent?: UICallToActionClickEvent.AsObject,
        assistCompletion?: AssistCompletionEvent.AsObject,
        uiIntegrationEnrollStartEvent?: UIIntegrationEnrollStartEvent.AsObject,
        uiIntegrationEnrollCompleteEvent?: UIIntegrationEnrollCompleteEvent.AsObject,
        editorChangeEvent?: EditorChangeEvent.AsObject,
        botCreate?: BotCreateEvent.AsObject,
        uiOnboardQuestionnaireSubmit?: UIOnboardQuestionnaireSubmitEvent.AsObject,
        botJoin?: BotJoinEvent.AsObject,
        assistExecution?: AssistExecutionEvent.AsObject,
        assistNewConversation?: AssistNewConversationEvent.AsObject,
        deviceAuthenticateEvent?: DeviceAuthenticateEvent.AsObject,
        featureRecommendationEvent?: FeatureRecommendationEvent.AsObject,
        assistAccessRequest?: AssistAccessRequestEvent.AsObject,
        assistAction?: AssistActionEvent.AsObject,
        deviceEnrollEvent?: DeviceEnrollEvent.AsObject,
        licenseLimitEvent?: LicenseLimitEvent.AsObject,
        accessListCreate?: AccessListCreateEvent.AsObject,
        accessListUpdate?: AccessListUpdateEvent.AsObject,
        accessListDelete?: AccessListDeleteEvent.AsObject,
        accessListMemberCreate?: AccessListMemberCreateEvent.AsObject,
        accessListMemberUpdate?: AccessListMemberUpdateEvent.AsObject,
        accessListMemberDelete?: AccessListMemberDeleteEvent.AsObject,
        accessListGrantsToUser?: AccessListGrantsToUserEvent.AsObject,
        uiDiscoverEc2InstanceSelection?: UIDiscoverEC2InstanceSelectionEvent.AsObject,
        uiDiscoverDeployEice?: UIDiscoverDeployEICEEvent.AsObject,
        uiDiscoverCreateNode?: UIDiscoverCreateNodeEvent.AsObject,
        desktopDirectoryShare?: DesktopDirectoryShareEvent.AsObject,
        desktopClipboardTransfer?: DesktopClipboardEvent.AsObject,
        tagExecuteQuery?: TAGExecuteQueryEvent.AsObject,
    }

    export enum EventCase {
        EVENT_NOT_SET = 0,
    
    USER_LOGIN = 3,

    SSO_CREATE = 4,

    RESOURCE_CREATE = 5,

    SESSION_START = 6,

    UI_BANNER_CLICK = 7,

    UI_ONBOARD_COMPLETE_GO_TO_DASHBOARD_CLICK = 9,

    UI_ONBOARD_ADD_FIRST_RESOURCE_CLICK = 10,

    UI_ONBOARD_ADD_FIRST_RESOURCE_LATER_CLICK = 11,

    UI_ONBOARD_SET_CREDENTIAL_SUBMIT = 12,

    UI_ONBOARD_REGISTER_CHALLENGE_SUBMIT = 13,

    UI_RECOVERY_CODES_CONTINUE_CLICK = 14,

    UI_RECOVERY_CODES_COPY_CLICK = 15,

    UI_RECOVERY_CODES_PRINT_CLICK = 16,

    UI_DISCOVER_STARTED_EVENT = 17,

    UI_DISCOVER_RESOURCE_SELECTION_EVENT = 18,

    USER_CERTIFICATE_ISSUED_EVENT = 19,

    SESSION_START_V2 = 20,

    UI_DISCOVER_DEPLOY_SERVICE_EVENT = 21,

    UI_DISCOVER_DATABASE_REGISTER_EVENT = 22,

    UI_DISCOVER_DATABASE_CONFIGURE_MTLS_EVENT = 23,

    UI_DISCOVER_DESKTOP_ACTIVE_DIRECTORY_TOOLS_INSTALL_EVENT = 24,

    UI_DISCOVER_DESKTOP_ACTIVE_DIRECTORY_CONFIGURE_EVENT = 25,

    UI_DISCOVER_AUTO_DISCOVERED_RESOURCES_EVENT = 26,

    UI_DISCOVER_DATABASE_CONFIGURE_IAM_POLICY_EVENT = 27,

    UI_DISCOVER_PRINCIPALS_CONFIGURE_EVENT = 28,

    UI_DISCOVER_TEST_CONNECTION_EVENT = 29,

    UI_DISCOVER_COMPLETED_EVENT = 30,

    ROLE_CREATE = 31,

    UI_CREATE_NEW_ROLE_CLICK = 32,

    UI_CREATE_NEW_ROLE_SAVE_CLICK = 33,

    UI_CREATE_NEW_ROLE_CANCEL_CLICK = 34,

    UI_CREATE_NEW_ROLE_VIEW_DOCUMENTATION_CLICK = 35,

    KUBE_REQUEST = 36,

    SFTP = 37,

    AGENT_METADATA_EVENT = 38,

    RESOURCE_HEARTBEAT = 39,

    UI_DISCOVER_INTEGRATION_AWS_OIDC_CONNECT_EVENT = 40,

    UI_DISCOVER_DATABASE_RDS_ENROLL_EVENT = 41,

    UI_CALL_TO_ACTION_CLICK_EVENT = 42,

    ASSIST_COMPLETION = 43,

    UI_INTEGRATION_ENROLL_START_EVENT = 44,

    UI_INTEGRATION_ENROLL_COMPLETE_EVENT = 45,

    EDITOR_CHANGE_EVENT = 46,

    BOT_CREATE = 47,

    UI_ONBOARD_QUESTIONNAIRE_SUBMIT = 48,

    BOT_JOIN = 49,

    ASSIST_EXECUTION = 50,

    ASSIST_NEW_CONVERSATION = 51,

    DEVICE_AUTHENTICATE_EVENT = 52,

    FEATURE_RECOMMENDATION_EVENT = 53,

    ASSIST_ACCESS_REQUEST = 54,

    ASSIST_ACTION = 55,

    DEVICE_ENROLL_EVENT = 56,

    LICENSE_LIMIT_EVENT = 57,

    ACCESS_LIST_CREATE = 58,

    ACCESS_LIST_UPDATE = 59,

    ACCESS_LIST_DELETE = 60,

    ACCESS_LIST_MEMBER_CREATE = 61,

    ACCESS_LIST_MEMBER_UPDATE = 62,

    ACCESS_LIST_MEMBER_DELETE = 63,

    ACCESS_LIST_GRANTS_TO_USER = 64,

    UI_DISCOVER_EC2_INSTANCE_SELECTION = 65,

    UI_DISCOVER_DEPLOY_EICE = 66,

    UI_DISCOVER_CREATE_NODE = 67,

    DESKTOP_DIRECTORY_SHARE = 68,

    DESKTOP_CLIPBOARD_TRANSFER = 69,

    TAG_EXECUTE_QUERY = 70,

    }

}

export class SubmitEventResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitEventResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitEventResponse): SubmitEventResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitEventResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitEventResponse;
    static deserializeBinaryFromReader(message: SubmitEventResponse, reader: jspb.BinaryReader): SubmitEventResponse;
}

export namespace SubmitEventResponse {
    export type AsObject = {
    }
}

export class SubmitEventsRequest extends jspb.Message { 
    clearEventsList(): void;
    getEventsList(): Array<SubmitEventRequest>;
    setEventsList(value: Array<SubmitEventRequest>): SubmitEventsRequest;
    addEvents(value?: SubmitEventRequest, index?: number): SubmitEventRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitEventsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitEventsRequest): SubmitEventsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitEventsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitEventsRequest;
    static deserializeBinaryFromReader(message: SubmitEventsRequest, reader: jspb.BinaryReader): SubmitEventsRequest;
}

export namespace SubmitEventsRequest {
    export type AsObject = {
        eventsList: Array<SubmitEventRequest.AsObject>,
    }
}

export class SubmitEventsResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitEventsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitEventsResponse): SubmitEventsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitEventsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitEventsResponse;
    static deserializeBinaryFromReader(message: SubmitEventsResponse, reader: jspb.BinaryReader): SubmitEventsResponse;
}

export namespace SubmitEventsResponse {
    export type AsObject = {
    }
}

export class HelloTeleportRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HelloTeleportRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HelloTeleportRequest): HelloTeleportRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HelloTeleportRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HelloTeleportRequest;
    static deserializeBinaryFromReader(message: HelloTeleportRequest, reader: jspb.BinaryReader): HelloTeleportRequest;
}

export namespace HelloTeleportRequest {
    export type AsObject = {
    }
}

export class HelloTeleportResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HelloTeleportResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HelloTeleportResponse): HelloTeleportResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HelloTeleportResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HelloTeleportResponse;
    static deserializeBinaryFromReader(message: HelloTeleportResponse, reader: jspb.BinaryReader): HelloTeleportResponse;
}

export namespace HelloTeleportResponse {
    export type AsObject = {
    }
}

export enum ResourceKind {
    RESOURCE_KIND_UNSPECIFIED = 0,
    RESOURCE_KIND_NODE = 1,
    RESOURCE_KIND_APP_SERVER = 2,
    RESOURCE_KIND_KUBE_SERVER = 3,
    RESOURCE_KIND_DB_SERVER = 4,
    RESOURCE_KIND_WINDOWS_DESKTOP = 5,
    RESOURCE_KIND_NODE_OPENSSH = 6,
    RESOURCE_KIND_NODE_OPENSSH_EICE = 7,
}

export enum DiscoverResource {
    DISCOVER_RESOURCE_UNSPECIFIED = 0,
    DISCOVER_RESOURCE_SERVER = 1,
    DISCOVER_RESOURCE_KUBERNETES = 2,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_SELF_HOSTED = 3,
    DISCOVER_RESOURCE_DATABASE_MYSQL_SELF_HOSTED = 4,
    DISCOVER_RESOURCE_DATABASE_MONGODB_SELF_HOSTED = 5,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_RDS = 6,
    DISCOVER_RESOURCE_DATABASE_MYSQL_RDS = 7,
    DISCOVER_RESOURCE_APPLICATION_HTTP = 8,
    DISCOVER_RESOURCE_APPLICATION_TCP = 9,
    DISCOVER_RESOURCE_WINDOWS_DESKTOP = 10,
    DISCOVER_RESOURCE_DATABASE_SQLSERVER_RDS = 11,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_REDSHIFT = 12,
    DISCOVER_RESOURCE_DATABASE_SQLSERVER_SELF_HOSTED = 13,
    DISCOVER_RESOURCE_DATABASE_REDIS_SELF_HOSTED = 14,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_GCP = 15,
    DISCOVER_RESOURCE_DATABASE_MYSQL_GCP = 16,
    DISCOVER_RESOURCE_DATABASE_SQLSERVER_GCP = 17,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_REDSHIFT_SERVERLESS = 18,
    DISCOVER_RESOURCE_DATABASE_POSTGRES_AZURE = 19,
    DISCOVER_RESOURCE_DATABASE_DYNAMODB = 20,
    DISCOVER_RESOURCE_DATABASE_CASSANDRA_KEYSPACES = 21,
    DISCOVER_RESOURCE_DATABASE_CASSANDRA_SELF_HOSTED = 22,
    DISCOVER_RESOURCE_DATABASE_ELASTICSEARCH_SELF_HOSTED = 23,
    DISCOVER_RESOURCE_DATABASE_REDIS_ELASTICACHE = 24,
    DISCOVER_RESOURCE_DATABASE_REDIS_MEMORYDB = 25,
    DISCOVER_RESOURCE_DATABASE_REDIS_AZURE_CACHE = 26,
    DISCOVER_RESOURCE_DATABASE_REDIS_CLUSTER_SELF_HOSTED = 27,
    DISCOVER_RESOURCE_DATABASE_MYSQL_AZURE = 28,
    DISCOVER_RESOURCE_DATABASE_SQLSERVER_AZURE = 29,
    DISCOVER_RESOURCE_DATABASE_SQLSERVER_MICROSOFT = 30,
    DISCOVER_RESOURCE_DATABASE_COCKROACHDB_SELF_HOSTED = 31,
    DISCOVER_RESOURCE_DATABASE_MONGODB_ATLAS = 32,
    DISCOVER_RESOURCE_DATABASE_SNOWFLAKE = 33,
    DISCOVER_RESOURCE_DOC_DATABASE_RDS_PROXY = 34,
    DISCOVER_RESOURCE_DOC_DATABASE_HIGH_AVAILABILITY = 35,
    DISCOVER_RESOURCE_DOC_DATABASE_DYNAMIC_REGISTRATION = 36,
    DISCOVER_RESOURCE_SAML_APPLICATION = 37,
    DISCOVER_RESOURCE_EC2_INSTANCE = 38,
}

export enum DiscoverStatus {
    DISCOVER_STATUS_UNSPECIFIED = 0,
    DISCOVER_STATUS_SUCCESS = 1,
    DISCOVER_STATUS_SKIPPED = 2,
    DISCOVER_STATUS_ERROR = 3,
    DISCOVER_STATUS_ABORTED = 4,
}

export enum CTA {
    CTA_UNSPECIFIED = 0,
    CTA_AUTH_CONNECTOR = 1,
    CTA_ACTIVE_SESSIONS = 2,
    CTA_ACCESS_REQUESTS = 3,
    CTA_PREMIUM_SUPPORT = 4,
    CTA_TRUSTED_DEVICES = 5,
    CTA_UPGRADE_BANNER = 6,
    CTA_BILLING_SUMMARY = 7,
    CTA_ACCESS_LIST = 8,
    CTA_ACCESS_MONITORING = 9,
}

export enum IntegrationEnrollKind {
    INTEGRATION_ENROLL_KIND_UNSPECIFIED = 0,
    INTEGRATION_ENROLL_KIND_SLACK = 1,
    INTEGRATION_ENROLL_KIND_AWS_OIDC = 2,
    INTEGRATION_ENROLL_KIND_PAGERDUTY = 3,
    INTEGRATION_ENROLL_KIND_EMAIL = 4,
    INTEGRATION_ENROLL_KIND_JIRA = 5,
    INTEGRATION_ENROLL_KIND_DISCORD = 6,
    INTEGRATION_ENROLL_KIND_MATTERMOST = 7,
    INTEGRATION_ENROLL_KIND_MS_TEAMS = 8,
    INTEGRATION_ENROLL_KIND_OPSGENIE = 9,
    INTEGRATION_ENROLL_KIND_OKTA = 10,
    INTEGRATION_ENROLL_KIND_JAMF = 11,
    INTEGRATION_ENROLL_KIND_MACHINE_ID = 12,
    INTEGRATION_ENROLL_KIND_MACHINE_ID_GITHUB_ACTIONS = 13,
    INTEGRATION_ENROLL_KIND_MACHINE_ID_CIRCLECI = 14,
    INTEGRATION_ENROLL_KIND_MACHINE_ID_GITLAB = 15,
    INTEGRATION_ENROLL_KIND_MACHINE_ID_JENKINS = 16,
    INTEGRATION_ENROLL_KIND_MACHINE_ID_ANSIBLE = 17,
}

export enum EditorChangeStatus {
    EDITOR_CHANGE_STATUS_UNSPECIFIED = 0,
    EDITOR_CHANGE_STATUS_ROLE_GRANTED = 1,
    EDITOR_CHANGE_STATUS_ROLE_REMOVED = 2,
}

export enum Feature {
    FEATURE_UNSPECIFIED = 0,
    FEATURE_TRUSTED_DEVICES = 1,
}

export enum FeatureRecommendationStatus {
    FEATURE_RECOMMENDATION_STATUS_UNSPECIFIED = 0,
    FEATURE_RECOMMENDATION_STATUS_NOTIFIED = 1,
    FEATURE_RECOMMENDATION_STATUS_DONE = 2,
}

export enum LicenseLimit {
    LICENSE_LIMIT_UNSPECIFIED = 0,
    LICENSE_LIMIT_DEVICE_TRUST_TEAM_JAMF = 1,
    LICENSE_LIMIT_DEVICE_TRUST_TEAM_USAGE = 2,
}
