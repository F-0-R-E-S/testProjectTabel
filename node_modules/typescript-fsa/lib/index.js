"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns `true` if action has the same type as action creator.
 * Defines Type Guard that lets TypeScript know `payload` type inside blocks
 * where `isType` returned `true`.
 *
 * @example
 *
 *    const somethingHappened =
 *      actionCreator<{foo: string}>('SOMETHING_HAPPENED');
 *
 *    if (isType(action, somethingHappened)) {
 *      // action.payload has type {foo: string}
 *    }
 */
function isType(action, actionCreator) {
    return action.type === actionCreator.type;
}
exports.isType = isType;
/**
 * Creates Action Creator factory with optional prefix for action types.
 * @param prefix Prefix to be prepended to action types as `<prefix>/<type>`.
 * @param defaultIsError Function that detects whether action is error given the
 *   payload. Default is `payload => payload instanceof Error`.
 */
function actionCreatorFactory(prefix, defaultIsError) {
    if (defaultIsError === void 0) { defaultIsError = function (p) { return p instanceof Error; }; }
    var actionTypes = {};
    var base = prefix ? prefix + "/" : '';
    function actionCreator(type, commonMeta, isError) {
        if (isError === void 0) { isError = defaultIsError; }
        var fullType = base + type;
        if (process.env.NODE_ENV !== 'production') {
            if (actionTypes[fullType])
                throw new Error("Duplicate action type: " + fullType);
            actionTypes[fullType] = true;
        }
        return Object.assign(function (payload, meta) {
            var action = {
                type: fullType,
                payload: payload,
            };
            if (commonMeta || meta) {
                action.meta = Object.assign({}, commonMeta, meta);
            }
            if (isError && (typeof isError === 'boolean' || isError(payload))) {
                action.error = true;
            }
            return action;
        }, {
            type: fullType,
            toString: function () { return fullType; },
            match: function (action) {
                return action.type === fullType;
            },
        });
    }
    function asyncActionCreators(type, commonMeta) {
        return {
            type: base + type,
            started: actionCreator(type + "_STARTED", commonMeta, false),
            done: actionCreator(type + "_DONE", commonMeta, false),
            failed: actionCreator(type + "_FAILED", commonMeta, true),
        };
    }
    return Object.assign(actionCreator, { async: asyncActionCreators });
}
exports.actionCreatorFactory = actionCreatorFactory;
exports.default = actionCreatorFactory;
