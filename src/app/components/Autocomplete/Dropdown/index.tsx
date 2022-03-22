import React, { useState, useEffect, useRef } from "react"
import classNames from "classnames"
import xImage from "./x_image.png"
import arrowBottom from "./arrow_bottom.png"

import style from "./Dropdown.module.scss"

type OptionValue = any
export type Option = {
  value: OptionValue
  label: string
}

type Props = {
  inputValue: string
  onInputChange: (value: string) => void
  selected: Option[]
  placeholder?: string
  options: Option[]
  onSelect: (options: Option[]) => void
  onFocus: () => void
  loading: boolean
}

const Dropdown: React.FC<Props> = ({
  selected,
  inputValue,
  options,
  placeholder,
  onFocus,
  onSelect,
  onInputChange,
  loading
}) => {
  const [currentValues, setCurrentValues] = useState<Option[]>(selected || [])
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

  const ref = useRef<HTMLHeadingElement>(null)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleSelect = (option: Option) => {
    setMenuOpen(false)
    const isSame = currentValues.find(value => value.value === option.value)

    if (!isSame) {
      setCurrentValues([...currentValues, option])
      onInputChange("")
    }
  }

  const removeSelectedItem = (option: Option) => {
    const filteredValues = currentValues.filter(value => value.value !== option.value)

    setCurrentValues(filteredValues)
  }

  const handleFocus = () => {
    setMenuOpen(true)
    onFocus()
  }

  const handleInputChange = (value: string) => {
    setMenuOpen(true)
    onInputChange(value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!isMenuOpen) {
      return false
    }

    if (e.key === "Escape") {
      setMenuOpen(false)
      return true
    }

    return true
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref])

  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener("keydown", onKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    onSelect(currentValues)
  }, [currentValues])

  return (
    <div className={style.dropDownWrapper} ref={ref}>
      <div className={style.dropDownMenu}>
        <div className={style.dropDownItems}>
          <div>
            {currentValues.map((value: Option, index: number) => (
              <div key={index.toString()} className={style.selectedItem}>
                <div className={style.selectedItemContent}>
                  {value.label.slice(0, 20)}
                  <div className={style.selectedItemRemoveButton} onClick={() => removeSelectedItem(value)}>
                    <img width={12} src={xImage} alt="x_image" />
                  </div>
                </div>
              </div>
            ))}
            <input
              className={style.input}
              value={inputValue}
              onChange={e => handleInputChange(e.target.value)}
              onFocus={handleFocus}
              placeholder={placeholder || "Type to search"}
            />
          </div>
        </div>
        <button type="button" className={style.dropDownButton} onClick={toggleMenu}>
          <img alt="arrow_bottom" src={arrowBottom} width={12} />
        </button>
      </div>
      <div
        className={classNames(style.dropDownListWrapper, {
          [style.menuOpen]: isMenuOpen && !!options.length || loading
        })}
      >
        {loading && !options.length ? (
          <div className={style.dropDownLoading}>
            Loading...
          </div>
        ) : (
          <ul
            className={style.dropDownList}
          >
            {options.map((option: Option, index: number) => (
              <React.Fragment key={index.toString()}>
                {"value" in option && option.label !== "" && (
                  <li>
                    <div
                      className={style.dropDownListItem}
                      onClick={() => handleSelect(option)}
                    >
                      <div>
                        {option.label}
                      </div>
                    </div>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dropdown