import React from 'react'
import { TestMode } from '../lib/types'
import { backgroundColor } from '../lib/utils'

export const ModeSwitcher = ({ mode, setMode, isRunning }: {
  mode: TestMode
  setMode: (mode: TestMode) => void
  isRunning: boolean
}) => (
  <div
    style={{
      height: 24,
      marginBottom: 32
    }}
  >
  {!isRunning && <select
      value={mode}
      onChange={ev => setMode(ev.target.value as TestMode)}
      style={{
        backgroundColor,
        color: 'white',
        border: 'none'
      }}
    >
      <option value={'words'}>words</option>
      <option value={'chars'}>chars</option>
    </select>}
  </div>
)
