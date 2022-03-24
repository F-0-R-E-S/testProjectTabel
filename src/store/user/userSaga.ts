import {
    call,
    // put,
    takeLatest,
} from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { bindAsyncAction } from "typescript-fsa-redux-saga";
import { getUser, getUsers, triggerGetUser, triggerGetUsers } from "./userTypes";
import axios from "axios";


const getUserSaga = bindAsyncAction(getUser)(function* (): SagaIterator {
    try {
        const results = yield call(apiFetch);
        async function apiFetch() {
            const config = {
                headers: {
                    "X-User-Id": `Auth0User`,
                    "X-Org-Id": `Auth0Org`,
                },
            };

            const data = {
                // "Page": 70,
                // "PerPage": 20
            };

            return await axios
                .post(`https://test-unified.client-api.vyyer.id/api/v2/scans/get`, data, config)
                .then((response) => {
                    return response.data.Data.map((item: any) => item.ID);
                }).catch((error) => {
                    console.log(error)
                });
        }
        //  yield put(triggerGetUsers(results))
         return { usersId: results.reverse() }
    } catch (e) {
        console.log('error')
    }
});

const getUsersSaga = bindAsyncAction(getUsers)(function* ({payload}): SagaIterator {
    try {
        const results = yield call(apiFetch);
        async function apiFetch() {
            const config = {
                headers: {
                    "X-User-Id": `Auth0User`,
                    "X-Org-Id": `Auth0Org`,
                },
            };

            const data = {
                "IDs": payload,
            };

            return await axios
                .post(`https://test-unified.client-api.vyyer.id/api/v2/identities/get`, data, config)
                .then((response) => {
                    return response.data.Data
                }).catch((error) => {
                    console.log(error)
                });
        }
        return { users: results }
    } catch (e) {
        console.log('error')
    }
});

export default function* functionExportSaga() {
    yield takeLatest(triggerGetUser.type, getUserSaga);
    yield takeLatest(triggerGetUsers.type, getUsersSaga);


}
