import React from "react"

import content from '../../static/content'
import manage from '../../static/manage'

import Typing from '../Typing/Typing'

const list = content.card__info.map((value, index) => {
	const { card_fill__delay } = manage
	
    return  <li key={index} className="card__string">
                <span className="card__label">{value.card__label}</span>
                <div className="card__fill">
                	<Typing 
		  				text={value.card__content}
		  				className='card__typing'
		  				startDelay={index*card_fill__delay}
                        shouldShow={true}
		  			/>
                </div>
            </li>
})

const Card__wr1 = () => {
    return  <ul className="card__wr1">
               {list}
            </ul>
}

export default Card__wr1