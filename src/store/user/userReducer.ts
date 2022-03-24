import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import { getUser, getUsers, UserStateType } from "./userTypes";

const INITIAL_STATE: UserStateType = {
  loading: false,
  users: [],
  usersId: []
};

export default reducerWithInitialState(INITIAL_STATE)
  .cases(
    [
      getUser.started,
      getUsers.started,
    ],
    (state) => ({
      ...state,
      loading: true,
    })
  )
  .case(getUser.done, (state, action) => {
    console.log(action)
    return produce(state, (draft) => {
      if (action.result) {
        draft.usersId = action.result.usersId;
      }
      draft.loading = false;
      return draft;
    });
  })
  .case(getUsers.done, (state, action) => {
    console.log(action)
    return produce(state, (draft) => {
      if (action.result) {
        draft.users = action.result.users;
      }
      draft.loading = false;
      return draft;
    });
  });
