import React, { useState } from "react"

import './Switcher.css'

const Switcher = ({ text, className, toggleHighlighting }) => {
	const [checked, setChecked] = useState(true)

	const onChange = () => {
		setChecked(!checked)
		toggleHighlighting()
	}

  	return  <label className={`${className} switcher rocker rocker-small`}>
			    <input
			     	checked={checked} 
			     	onChange={onChange}
			     	type="checkbox" />
			    <span className="switch-left">On</span>
			    <span className="switch-right">Off</span>
			</label>
}

export default Switcher