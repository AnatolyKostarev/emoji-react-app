import React from 'react'
import './Header.css'

export const Header = ({ onInput, value }) => {
  return (
    <header id="sec" className="header">
      <div className="header__emoji">
        <h1 className="header__title">Emoji Finder</h1>
        <p className="header__text">Find emoji by keywords</p>
        <input
          className="header__search"
          type="text"
          placeholder="Placeholder"
          onInput={onInput}
          value={value}
        />
      </div>
    </header>
  )
}
