import React, { useState, useCallback } from 'react'

import Cron, { CronError } from '../index'
import './styles.stories.css'

export default {
  title: 'ReactJS Cron',
  component: Demo,
}

export function Demo() {
  const defaultValue = '30 5 * * 1,6'
  const [value, setValue] = useState(defaultValue)
  const customSetValue = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])
  const [error, onError] = useState<CronError>()

  return (
    <div>
      <Cron value={value} setValue={customSetValue} onError={onError} />

      <p style={{ marginTop: 20 }}>
        Error: {error ? error.description : 'undefined'}
      </p>

      <p style={{ marginTop: 20 }}>Selected Value: {value}</p>
    </div>
  )
}
