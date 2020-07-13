import { useEffect, useRef, useState } from 'react'

const querySelector = name => 
	document.querySelector(`.${name?.toLowerCase()}`)

const querySelectorAll = name => 
	document.querySelectorAll(`.${name}`)

const addClass = (selector, className) => 
	selector?.classList.add(className)

const removeClass = (selector, className) => 
	selector?.classList.remove(className)

const toggleClass = (selector, className) => 
	selector?.classList.toggle(className)

const ifStringContArr = (string, arr) => 
	arr.some(item => string.toLowerCase().includes(item))

const removeElem = (arr, elem) =>
  arr = arr.filter(item => item !== elem)

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const useTimeout = (callback, delay) => {
  const timeoutRef = useRef()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => 
      	callbackRef.current(), delay)

      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])

  return timeoutRef
}

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth)
  // Add a second state variable "height" and default it to the current window height
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      // Set the height in state as well as the width
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Return both the height and width
  return { width, height }
}

export {
	querySelector,
	addClass,
	removeClass,
	ifStringContArr,
	querySelectorAll,
	toggleClass,
  removeElem,
	useInterval,
	useTimeout,
  useViewport,
}