import { ActionConst } from 'react-native-router-flux';

/**
 * Enables the use of custom onEnter hook on a react-native-router-flux Scene component
 * @example <Scene key="home" component={Home} onEnter={dispatch => dispatch(myAction())} />
 */
const sceneOnEnterMiddleware = ({ dispatch, getState }) => next => action => {
    const result = next(action);

    if (action.type === ActionConst.FOCUS) {
        const onEnter = action.scene.onEnter
        
        if (typeof onEnter === 'function') {
            onEnter(dispatch, getState);
        }
    }

    return result;
};

export default sceneOnEnterMiddleware;
