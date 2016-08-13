export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECTED = 'WS_CONNECTED';
export const WS_DISCONNECTED = 'WS_DISCONNECTED';
export const WS_ERROR = 'WS_ERROR';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsConnect = url => ({ type: WS_CONNECT, payload: url });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });
export const wsConnected = () => ({ type: WS_CONNECTED });
export const wsDisconnected = () => ({ type: WS_DISCONNECTED });
export const wsError = error => ({ type: WS_ERROR, payload: error });
export const wsMessage = message => ({ type: WS_MESSAGE, payload: message });
export const wsSendMessage = message => ({ type: WS_SEND_MESSAGE, payload: message });
