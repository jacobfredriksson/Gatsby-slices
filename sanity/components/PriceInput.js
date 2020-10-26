import React from 'react'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

export const PriceInput = ({type, value, onChange, inputComponent}) => {

  const createPatchFrom = (value) => {
    console.log(value)
     return PatchEvent.from(value === '' ? unset() : set(Number(value)))
  }

  const formatMoney = Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK'
  }).format;

  return (
  <div>
    <h2> {type.title} - {value && formatMoney(value)}</h2>
    <p> {type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={event => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
  )
}

