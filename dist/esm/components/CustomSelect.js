import React, { useMemo, useCallback } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { formatValue } from '../converter';
import { sort } from '../utils';
export default function CustomSelect(props) {
  const {
    value,
    optionsList,
    setValue,
    humanizeLabels,
    leadingZero,
    clockFormat,
    unit
  } = props;
  const stringValue = useMemo(() => {
    if (value && Array.isArray(value)) {
      return value.map(value => value.toString());
    }

    return [];
  }, [value]);
  const options = useMemo(() => {
    if (optionsList) {
      return optionsList.map((option, index) => {
        const number = unit.min === 0 ? index : index + 1;
        return {
          value: number.toString(),
          label: option
        };
      });
    }

    return [...Array(unit.total)].map((e, index) => {
      const number = unit.min === 0 ? index : index + 1;
      return {
        value: number.toString(),
        label: formatValue(number, unit, humanizeLabels, leadingZero, clockFormat)
      };
    });
  }, [optionsList, leadingZero, humanizeLabels, clockFormat]);
  const simpleClick = useCallback(event => {
    let newValueOption = event.target.value;

    if (newValueOption.length == 0) {
      newValueOption.push(0);
    }

    newValueOption = Array.isArray(newValueOption) ? sort(newValueOption) : [newValueOption];
    const newValue = newValueOption;

    if (newValue.length === unit.total) {
      setValue([]);
    } else {
      setValue(newValue);
    }
  }, [setValue, value]);
  return React.createElement(Select, {
    multiple: true,
    onChange: simpleClick,
    defaultValue: value,
    value: stringValue
  }, options.map(({
    value: v,
    label: l
  }) => React.createElement(MenuItem, {
    key: v,
    value: v
  }, l)));
}