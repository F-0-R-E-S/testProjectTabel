'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('@mantine/hooks');
var padTime = require('../pad-time/pad-time.js');

function createTimeHandler({ onChange, nextRef, min, max, maxValue }) {
  return (value, triggerShift, forceTriggerShift = false) => {
    var _a, _b;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return;
    }
    if (parsed > maxValue || forceTriggerShift) {
      onChange(padTime.padTime(hooks.clamp({ value: parsed, min, max }).toString()));
      triggerShift && ((_a = nextRef == null ? void 0 : nextRef.current) == null ? void 0 : _a.focus());
      triggerShift && ((_b = nextRef == null ? void 0 : nextRef.current) == null ? void 0 : _b.select());
      return;
    }
    onChange(parsed.toString());
  };
}

exports.createTimeHandler = createTimeHandler;
//# sourceMappingURL=create-time-handler.js.map
