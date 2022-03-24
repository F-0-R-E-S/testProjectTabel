import actionCreatorFactory, { Action } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export type UserStateType = {
  readonly loading: boolean;
  readonly users: any;
  readonly usersId: Array<number>
};

export type user = {

}

export type GetUsersIdDonePayload = {
  loading: boolean;
  usersId: any;
};

export type GetUserDonePayload = {
  loading: boolean;
  users: any;
};

export const triggerGetUser = actionCreator(
  "project/TRIGGER_GET_USER"
);

export const getUser = actionCreator.async<
  Action<any>,
  GetUsersIdDonePayload
>("project/GET_USER");

export const triggerGetUsers = actionCreator<Array<any>>(
  "project/TRIGGER_GET_USERS"
);

export const getUsers = actionCreator.async<
  Action<Array<any>>,
  GetUserDonePayload
>("project/GET_USERS");
