import { InitialStateType } from "./.umi/plugin-initialState/@@initialState";

export default (initialState: InitialStateType) => {
    return {
        isAuthorized: initialState?.user ? true : false
    }
}