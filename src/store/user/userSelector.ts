import { RootState } from "../rootTypes";
import { createSelector } from "reselect";

const selectUser = (state: RootState) => state.user;

export const selectUserData = createSelector(
    selectUser,
    (state) => {
        return state.users
    }
);

export const selectUserIdData = createSelector(
    selectUser,
    (state) => {
        return state.usersId
    }
);


export const selectUserLoading = createSelector(
    selectUser,
    (state) => {
        return state.loading
    }
);