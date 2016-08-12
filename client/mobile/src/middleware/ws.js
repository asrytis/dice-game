import {
    WS_CONNECT,
    WS_DISCONNECT,
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
            ws.onmessage = ({ data }) => store.dispatch(wsMessage(data));
            ws.onerror = ({ message }) => store.dispatch(wsError(message));
            ws.onclose = () => store.dispatch(wsDisconnected());
        break;
        case WS_DISCONNECT:
            ws.close();
        break;
    }
    return next(action);
};

export default wsMiddleware;
