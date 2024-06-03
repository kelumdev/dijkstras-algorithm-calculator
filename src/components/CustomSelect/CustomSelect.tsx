import React from 'react'
import Select, { SingleValue, Props as SelectProps } from 'react-select'

import { OptionType } from '../../types'

interface CustomSelectProps extends SelectProps<OptionType, false> {
  options: OptionType[]
  value?: OptionType | null
  placeholder?: string
  label?: string
  disabled?: boolean
  id?: string
  onChange: (selectedOption: SingleValue<OptionType>) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  label,
  disabled,
  id,
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className='block text-color-body text-sm mb-[8px]'>
        {label}
      </label>
      <Select
        id={id}
        options={options}
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        styles={{
          control: provided => ({
            ...provided,
            border: '1px solid #D9DADD',
            borderRadius: '8px',
            paddingLeft: '4px',
            paddingRight: '4px',
            minHeight: '42px',
            height: '42px',
            fontSize: '14px',
            lineHeight: '18px',
          }),
          menu: provided => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }),
          indicatorSeparator: provided => ({
            ...provided,
            display: 'none',
          }),
          dropdownIndicator: provided => ({
            ...provided,
            color: '#1B1C1E',
            svg: {
              width: '16px',
            },
          }),
        }}
        {...props}
      />
    </>
  )
}

export default CustomSelect
