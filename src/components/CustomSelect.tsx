import React, { useMemo, useCallback } from 'react'
import { Select, MenuItem } from '@material-ui/core'

import { CustomSelectProps } from '../types'
import { formatValue } from '../converter'
import { sort } from '../utils'

// function getStyles(option: string, options: string[]) {
//   return {
//     fontWeight: options.indexOf(option) === -1 ? 'normal' : 'bold',
//   }
// }

export default function CustomSelect(props: CustomSelectProps) {
  const {
    value,
    optionsList,
    setValue,
    humanizeLabels,
    leadingZero,
    clockFormat,
    unit,
  } = props

  const stringValue = useMemo(() => {
    if (value && Array.isArray(value)) {
      return value.map((value: number) => value.toString())
    }
    return []
  }, [value])

  const options = useMemo(
    () => {
      if (optionsList) {
        return optionsList.map((option, index) => {
          const number = unit.min === 0 ? index : index + 1

          return {
            value: number.toString(),
            label: option,
          }
        })
      }

      return [...Array(unit.total)].map((e, index) => {
        const number = unit.min === 0 ? index : index + 1

        return {
          value: number.toString(),
          label: formatValue(
            number,
            unit,
            humanizeLabels,
            leadingZero,
            clockFormat
          ),
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [optionsList, leadingZero, humanizeLabels, clockFormat]
  )
  const simpleClick = useCallback(
    (event: any) => {
      let newValueOption: number[] = event.target.value
      if (newValueOption.length == 0) {
        newValueOption.push(0)
      }
      newValueOption = Array.isArray(newValueOption)
        ? sort(newValueOption)
        : [newValueOption]
      const newValue: number[] = newValueOption

      if (newValue.length === unit.total) {
        setValue([])
      } else {
        setValue(newValue)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, value]
  )

  return (
    <Select
      multiple
      onChange={simpleClick}
      defaultValue={value}
      value={stringValue}
    >
      {options.map(({ value: v, label: l }) => (
        <MenuItem key={v} value={v}>
          {l}
        </MenuItem>
      ))}
    </Select>
  )
}
