import { WS_MESSAGE } from '../actions/ws';

/**
 * Converting messages from WebSocket to redux actions
 */
const serverActionsMiddleware = ({ dispatch }) => next => action => {

    if (action.type === WS_MESSAGE) {
        dispatch(action.payload);
    }

    return next(action);
};

export default serverActionsMiddleware;
