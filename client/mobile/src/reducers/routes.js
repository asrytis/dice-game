import { createReducer } from 'redux-create-reducer';
import { ActionConst } from 'react-native-router-flux';

const initialState = {
    scene: {}
};

export default createReducer(initialState, {
    // focus action is dispatched when a new screen comes into focus
    [ActionConst.FOCUS](state, action) {
        return {
            ...state,
            scene: action.scene,
        };
    }
});
