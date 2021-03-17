"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CustomSelect;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _converter = require("../converter");

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CustomSelect(props) {
  var value = props.value,
      optionsList = props.optionsList,
      setValue = props.setValue,
      humanizeLabels = props.humanizeLabels,
      leadingZero = props.leadingZero,
      clockFormat = props.clockFormat,
      unit = props.unit;
  var stringValue = (0, _react.useMemo)(function () {
    if (value && Array.isArray(value)) {
      return value.map(function (value) {
        return value.toString();
      });
    }

    return [];
  }, [value]);
  var options = (0, _react.useMemo)(function () {
    if (optionsList) {
      return optionsList.map(function (option, index) {
        var number = unit.min === 0 ? index : index + 1;
        return {
          value: number.toString(),
          label: option
        };
      });
    }

    return _toConsumableArray(Array(unit.total)).map(function (e, index) {
      var number = unit.min === 0 ? index : index + 1;
      return {
        value: number.toString(),
        label: (0, _converter.formatValue)(number, unit, humanizeLabels, leadingZero, clockFormat)
      };
    });
  }, [optionsList, leadingZero, humanizeLabels, clockFormat]);
  var simpleClick = (0, _react.useCallback)(function (event) {
    var newValueOption = event.target.value;

    if (newValueOption.length == 0) {
      newValueOption.push(0);
    }

    newValueOption = Array.isArray(newValueOption) ? (0, _utils.sort)(newValueOption) : [newValueOption];
    var newValue = newValueOption;

    if (newValue.length === unit.total) {
      setValue([]);
    } else {
      setValue(newValue);
    }
  }, [setValue, value]);
  return _react["default"].createElement(_core.Select, {
    multiple: true,
    onChange: simpleClick,
    defaultValue: value,
    value: stringValue
  }, options.map(function (_ref) {
    var v = _ref.value,
        l = _ref.label;
    return _react["default"].createElement(_core.MenuItem, {
      key: v,
      value: v
    }, l);
  }));
}