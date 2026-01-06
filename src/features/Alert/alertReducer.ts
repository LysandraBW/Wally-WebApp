import React from "react"

export type Key = number | string;
export enum AlertActionType {Refresh, AddMessage, DeleteMessage, PutConfirmation, DeleteConfirmation}

export interface AlertState {
    messages: Array<{
        node: React.ReactNode;
        key: Key;
        ttl: number;
    }>
    confirmation: React.ReactNode;
}
export type AddMessage = {node: React.ReactNode; key: Key}
export type DeleteMessage = {key: Key}
export type SetConfirmation = {node: React.ReactNode}
export type AlertAction = {type: AlertActionType} & (AddMessage | DeleteMessage | SetConfirmation | {});

export const startAlert: AlertState = {
    messages: [],
    confirmation: null
}

export default function alertReducer(state: AlertState, action: AlertAction): AlertState {
    if (action.type === AlertActionType.Refresh) {
        const messages = [...state.messages].filter(msg => {
            const elapsedTime = Date.now() - msg.ttl;
            return elapsedTime < 100*1000;
        });
        return {
            ...state,
            messages
        };
    }
    else if (action.type === AlertActionType.AddMessage) {
        const castedAction = action as AlertAction & AddMessage;

        const messages = [...state.messages];
        messages.push({
            node: castedAction.node,
            key: castedAction.key,
            ttl: Date.now()
        });

        return {
            ...state,
            messages
        }
    }
    else if (action.type === AlertActionType.DeleteMessage) {
        const castedAction = action as AlertAction & DeleteMessage;
        
        let messages = [...state.messages];
        messages = messages.filter(msg => msg.key !== castedAction.key);

        return {
            ...state,
            messages
        }
    }
    else if (action.type === AlertActionType.PutConfirmation) {
        const castedAction = action as AlertAction & SetConfirmation;
        return {
            ...state,
            confirmation: castedAction.node
        }
    }
    else if (action.type === AlertActionType.DeleteConfirmation) {
        return {
            ...state,
            confirmation: null
        }
    }

    throw 'Unknown Action';
}