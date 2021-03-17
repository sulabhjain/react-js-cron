import React, { useMemo } from 'react';
import CustomSelect from '../components/CustomSelect';
import { DEFAULT_LOCALE_EN } from '../locale';
import { classNames } from '../utils';
import { UNITS } from '../constants';
export default function MonthDays(props) {
  const {
    value,
    setValue,
    locale,
    className,
    weekDays,
    disabled,
    readOnly,
    leadingZero,
    period
  } = props;
  const noWeekDays = !weekDays || weekDays.length === 0;
  const internalClassName = useMemo(() => classNames({
    'react-js-cron-field': true,
    'react-js-cron-month-days': true,
    'react-js-cron-month-days-placeholder': !noWeekDays,
    [`${className}-field`]: !!className,
    [`${className}-month-days`]: !!className
  }), [className, noWeekDays]);
  const displayMonthDays = !readOnly || value && value.length > 0 || (!value || value.length === 0) && (!weekDays || weekDays.length === 0);
  return displayMonthDays ? React.createElement("div", {
    className: internalClassName
  }, locale.prefixMonthDays !== '' && React.createElement("span", null, locale.prefixMonthDays || DEFAULT_LOCALE_EN.prefixMonthDays), React.createElement(CustomSelect, {
    value: value,
    setValue: setValue,
    unit: UNITS[2],
    locale: locale,
    disabled: disabled,
    readOnly: readOnly,
    leadingZero: leadingZero,
    period: period
  })) : null;
}