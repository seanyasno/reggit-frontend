import ILoginFormActionPayload from './login-form-action-payload';
import {LoginFormActionType} from './login-form-action-type';

export default interface ILoginFormAction {
    type: LoginFormActionType;
    payload: ILoginFormActionPayload;
}