import { useState, useEffect, useRef } from 'preact/hooks'

import './Card.css'

import Face from '../../components/Face/Face'
import SocLinks from '../../components/SocLinks/SocLinks'
import Card__wr1 from '../../components/Card__wr1/Card__wr1'
import Card__wr2 from '../../components/Card__wr2/Card__wr2'
import Typing from '../../components/Typing/Typing'
import Draw from '../../components/Draw/Draw'

import content from '../../static/content'
import manage from '../../static/manage'
import { getRandom, isFocused } from '../../static/functions'

const Card = () => {
    const [shouldSmile, setSmile] = useState(false)
    const [shouldShowTyping, setShowTyping] = useState(false)
    const [random] = useState(getRandom(9))
    const [typings, setTypings] = useState({
        show: false,
        text: content.card__typings[0],
        pos: getRandom(9)
    })
    const timeouts = useRef({
        hide: null,
        show: null,
        nonVis: null,
        nextTyp: null,
        startAnim: null,
    })

    useEffect(() => {
        if (typeof window !== 'undefined')
            document.title = content.titles.card

        startAnimation(true)

        return () => {
            clearTimeout(timeouts.current.show)
            clearTimeout(timeouts.current.hide)
            clearTimeout(timeouts.current.nonVis)
            clearTimeout(timeouts.current.nextTyp)
            clearTimeout(timeouts.current.startAnim)
        }
    }, [])

    const goNextTyping = (counter) => {
        if (!isFocused()) {
            timeouts.current.nextTyp = setTimeout(() => goNextTyping(counter), 1000)
            return
        }

        const newCounter = counter + 1
        const newTyping = {
            text: content.card__typings[counter],
            pos: getRandom(9),
            show: true
        }

        setTypings(newTyping)

        if (!content.card__typings[counter])
            return

        timeouts.current.hide = setTimeout(() => {
            setTypings({...newTyping,  show: false })
        }, manage.card__typings__hide_time)

        timeouts.current.show = setTimeout(() => {
            goNextTyping(newCounter)
        }, manage.card__typings__show_time)
    }

    const startAnimation = (bool) => {
        if (!isFocused()) {
            timeouts.current.startAnim = setTimeout(() => startAnimation(bool), 500)
        } else {
            setShowTyping(true)

            timeouts.current.nonVis = setTimeout(() => {
                setShowTyping(false)
                goNextTyping(0)
            }, manage.card__typing__hide_time)
        }
    }

    return  <section className="main">
                <Typing
                    text={content.card__typing}
                    className={`card__typing card__out_typing card__out_typing-${random}`}
                    startDelay={manage.card__typing__show_time}
                    shouldShow={shouldShowTyping}
                />

                <Typing
                    text={typings.text}
                    className={`card__typing card__out_typing card__out_typing-${typings.pos}`}
                    shouldShow={typings.show}
                />

                <Draw />

                <div className="card">
                    <div className="card__cap">
                        <h1 className="card__title">
                            {content.card__title}
                        </h1>
                        <SocLinks
                            onMouseOver={() => setSmile(true)}
                            onMouseLeave={() => setSmile(false)}
                            shouldInherit='card'
                        />
                    </div>
                    <div className="card__body">
                        <div className="card__photo">
                            <Face
                                shouldSmile={shouldSmile}
                            />
                        </div>
                        <div className="card__info">
                            <Card__wr1 />
                            <Card__wr2
                                onMouseOver={() => setSmile(true)}
                                onMouseLeave={() => setSmile(false)}
                            />
                        </div>
                    </div>
                </div>
            </section>
}

export default Card
