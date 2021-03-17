import React, { useState, useCallback } from 'react';
import Cron from '../index';
import './styles.stories.css';
export default {
  title: 'ReactJS Cron',
  component: Demo
};
export function Demo() {
  const defaultValue = '30 5 * * 1,6';
  const [value, setValue] = useState(defaultValue);
  const customSetValue = useCallback(newValue => {
    setValue(newValue);
  }, []);
  const [error, onError] = useState();
  return React.createElement("div", null, React.createElement(Cron, {
    value: value,
    setValue: customSetValue,
    onError: onError
  }), React.createElement("p", {
    style: {
      marginTop: 20
    }
  }, "Error: ", error ? error.description : 'undefined'), React.createElement("p", {
    style: {
      marginTop: 20
    }
  }, "Selected Value: ", value));
}