export default class BaseReducer {
    initialState: object = {};

    reducer = (state = this.initialState, action: object) => {
        // @ts-ignore
        const method = this[action.type];

        // @ts-ignore
        if (!method || action.error) {
            return state;
        }

        return method.call(this, state, action);
    }
}