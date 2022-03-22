import React, { useState, useEffect } from "react"
import Dropdown, { Option } from "./Dropdown"
import axios from "axios"

type Props = {
  url: string
  onSelect: (options: Option[]) => void
  valueKey?: string
  labelKey?: string
  searchTimeout?: number
  placeholder?: string
}

const Autocomplete: React.FC<Props> = ({ url, placeholder, onSelect, valueKey, labelKey, searchTimeout }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [value, setValue] = useState<string>("")
  const [timeoutTimer, setTimeoutTimer] = useState<number>(0)

  const handleSelect = (options: Option[]) => {
    setSelectedOptions(options)
  }

  const search = () => {
    if (!value) {
      setOptions([])
    }

    // Тут можно добавить поиск по search=value например, и получать с бека только нужные варианты, но fake api такого не нашел)

    const dataToOptions = (data: Array<any>) => {
      const result = data.reduce((acc: Array<any>, item: any) => {
        if (labelKey) {
          return valueKey
            ? [...acc, { ...item, value: item[valueKey], label: item[labelKey] }]
            : [...acc, item]
        }

        return valueKey ? [...acc, { ...item, value: item[valueKey] }] : [...acc, item]
      }, [])

      setOptions(result)
    }

    axios.get(url)
      .then(res => {
        const data = res.data

        dataToOptions(data)
      })

    return true
  }

  const filteredOptions = value.length > 0 ? options.filter(option => option.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : options

  const onChange = (v: string) => {
    setValue(v)

    window.clearTimeout(timeoutTimer)

    setTimeoutTimer(
      window.setTimeout(() => {
        search()
      }, searchTimeout || 300)
    )
  }

  const onFocus = () => {
    search()
  }

  useEffect(() => {
    onSelect(selectedOptions)
  }, [selectedOptions])

  return (
    <Dropdown
      inputValue={value}
      onInputChange={value => onChange(value)}
      options={filteredOptions}
      selected={selectedOptions}
      onSelect={options => handleSelect(options)}
      onFocus={onFocus}
      placeholder={placeholder}
    />
  )
}

export default Autocomplete