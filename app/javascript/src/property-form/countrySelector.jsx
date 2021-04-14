import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector(props) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  let codeValue = null;
  if (props.value) {
	codeValue = options.filter(obj => {
	  return obj.label === props.value
	});
  }

  return <Select options={options} value={codeValue} onChange={props.onChange} name={props.name} />
}

export default CountrySelector