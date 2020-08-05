import { useEffect } from "preact/hooks"
import ReactHtmlParser from 'react-html-parser'
import LinkBack from '../../components/LinkBack/LinkBack'

import posts from '../../static/posts'
import { querySelector, findPostBySlug, addClass, importAll } from '../../static/functions'

import './Post.css'

const images = importAll(require.context('../../assets/posts/', false, /\.(png|jpe?g|svg)$/))

const Post = ({ slug }) => {
    const { image, title, content, desc, posted } = findPostBySlug(posts, slug)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = title
            // window.scrollTo(0, 0)

            const hashClass = window.location.hash.split("#", 3)[2]
            if (hashClass) {
                const element = querySelector(hashClass)
                setTimeout(() => {
                    window.scrollTo({
                        behavior: "smooth",
                        top: element.offsetTop
                    })
                    addClass(element, 'post__text-active')
                }, 100)
            }
        }
    }, [title, desc, slug, image])

  	return 	<main className="post">
                <article className="post__article">
                    <h1 className="post__title">{title}</h1>
                    <img className="post__img" src={images[image].default} alt={title} loading="lazy"/>
                    <div className="post__text">{ReactHtmlParser(content)}</div>
                    <p className="post__date">{posted}</p>
                </article>
                <LinkBack className="post__back" />
		    </main>
}

export default Post