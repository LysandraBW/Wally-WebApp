import Confirm from "@/components/Alert/Confirm/Confirm";
import Message, { MessageType } from "@/components/Alert/Message/Message";

export enum AlertActionType {
    RefreshMessages,
    AddMessage,
    CloseMessage,
    AddConfirmation,
    CloseConfirmation
}

export interface AlertReducerState {
    messages: Array<[React.ReactNode, number]>;
    confirmation: React.ReactNode;
}

export interface AlertReducerAction {
    type: AlertActionType;
    addMessage?: {
        message: React.ReactNode;
        messageType: MessageType;
        onClose?: () => any;
    }
    closeMessage?: {
        message: React.ReactNode;
    }
    addConfirmation?: {
        message: React.ReactNode;
        agreeLabel: string;
        disagreeLabel: string;
        onAgree: () => any;
        onDisagree: () => any;
        onClose?: () => any;
    }
}

export default function AlertReducer(state: AlertReducerState, action: AlertReducerAction): AlertReducerState {
    // Refresh Messages
    if (action.type === AlertActionType.RefreshMessages) {
        const messages = [...state.messages].filter(message => {
            const elapsedTime = Date.now() - message[1];
            return elapsedTime < 10*1000;
        });
        return {
            ...state,
            messages: messages
        };
    }

    // Add a Message
    else if (action.type === AlertActionType.AddMessage && action.addMessage) {
        const message = (
            <Message 
                {...action.addMessage} 
                onClose={() => {
                    // The chaining is needed for the TS compiler.
                    action.addMessage && action.addMessage.onClose && action.addMessage.onClose();
                }}
            />
        );
        return {
            ...state,
            messages: [...state.messages, [message, Date.now()]]
        };
    }

    // Closing a Message
    else if (action.type === AlertActionType.CloseMessage && action.closeMessage) {
        // This doesn't work because it needs the context of the actual
        // reducer. Thus, it must be called from outside this function.
        // However, I don't know how I can reliably access the added message
        // considering that it's async. I could be wrong.
        const messageToClose = action.closeMessage.message;
        const messages = [...state.messages].filter(message => message[0] !== messageToClose);

        return {
            ...state,
            messages: messages
        };
    }
    
    // Add a Confirmation
    else if (action.type === AlertActionType.AddConfirmation && action.addConfirmation) {
        const confirmation = (
            <Confirm 
                {...action.addConfirmation}
                onClose={() => {
                    AlertReducer(state, {
                        type: AlertActionType.CloseConfirmation
                    });
                    action.addConfirmation && action.addConfirmation.onClose && action.addConfirmation.onClose();
                }}
            />
        );
        return {
            ...state,
            confirmation: confirmation
        };
    }

    // Closing a Confirmation
    else if (action.type === AlertActionType.CloseConfirmation) {
        return {
            ...state,
            confirmation: null
        };
    }
    
    throw 'Unknown Action';
}

export const InitialAlert = {
    messages: [],
    confirmation: null
}