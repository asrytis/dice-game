import {
    WS_CONNECT,
    WS_DISCONNECT,
    WS_SEND_MESSAGE,
    wsConnected,
    wsDisconnected,
    wsMessage,
    wsError
} from '../actions/ws.js';

let ws;

const wsMiddleware = store => next => action => {
    switch (action.type) {
        case WS_CONNECT:
            ws && ws.close();
            ws = new WebSocket(action.payload);
            ws.onopen = () => store.dispatch(wsConnected());
            ws.onmessage = ({ data }) => store.dispatch(wsMessage(JSON.parse(data)));
            ws.onerror = ({ message }) => store.dispatch(wsError(message));
            ws.onclose = () => store.dispatch(wsDisconnected());
        break;
        case WS_SEND_MESSAGE:
            ws && ws.send(JSON.stringify(action.payload));
        break;
        case WS_DISCONNECT:
            ws && ws.close();
            ws = null;
        break;
    }
    return next(action);
};

export default wsMiddleware;
