import { WS_MESSAGE } from '../actions/ws';

const serverActionsMiddleware = ({ dispatch }) => next => action => {

    if (action.type === WS_MESSAGE) {
        dispatch(action.payload);
    }

    return next(action);
};

export default serverActionsMiddleware;
