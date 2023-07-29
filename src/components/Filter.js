import React from 'react'
import { STATUSES } from '../App'

const Filter = ({ setFilter }) => {
  const filterOptions = [
    { value: "all", label: "すべて"},
    { value: STATUSES.TODO, label: "未着手"},
    { value: STATUSES.IN_PROGRESS, label: "着手中"},
    { value: STATUSES.DONE, label: "完了"},
  ]
  return (
    <select onChange={(e) => setFilter(e.target.value)}>
      {filterOptions.map((option) => 
        <option key={option.value} value={option.value}>{option.label}</option>
      )}
    </select>
  )
}

export default Filter
