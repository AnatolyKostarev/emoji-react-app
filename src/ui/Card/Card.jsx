import React from 'react'
import './Card.css'

export const Card = ({ symbol, title, keywords }) => {
  return (
    <div className="cards__item">
      <p className="cards__symbol">{symbol}</p>
      <p className="cards__title">{title}</p>
      <p className="cards__keywords">{keywords}</p>
    </div>
  )
}
