import {Dispatch} from "react";

export default class ActionUtility {
    static async createThunkEffect(dispatch: Dispatch<any>, actionType: string, effect: void, ...args: any) {
        dispatch(ActionUtility.createAction(actionType));
        // @ts-ignore
        const model = await effect(...args);
        dispatch(ActionUtility.createAction(`${actionType}_FINISHED`, model, false));
        return model;
    }

    static createAction(type: any, payload: any = {}, error: boolean = false, meta: any = null) {
        return { type, payload, error, meta };
    }
}