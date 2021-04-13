import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector(props) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  return <Select options={options} value={props.value} onChange={props.onChange} name={props.name} />
}

export default CountrySelector