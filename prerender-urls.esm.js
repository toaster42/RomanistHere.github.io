import posts from './src/static/posts'

const dynamic = posts.map(({
    title,
    slug,
    image,
    desc
}, index) => {
    return {
        url: `/posts/${slug}`,
        title: `${title}`,
        ogTitle: `${title}`,
        description: `${desc}`,
        img: `/assets/posts/${image}`
    }
})

const staticData = [
    {
        url: `/`,
        title: `RomanistHere. An independent JavaScript developer.`,
        ogTitle: `RomanistHere. An independent JavaScript developer.`,
        description: `Hey, I am Roman Smunyov and I am a JavaScript developer. It is time for you to finally meet me. My goal is to make the web better. I develop non-commercial open source projects. Join!`,
        img: `/assets/pages/preview.png`
    }, {
        url: `/offer/`,
        title: `Let's see who I am`,
        ogTitle: `Roman Smunyov. Professional summary`,
        description: `Front-end developer with background in native HTML/CSS/JS, Frameworks and Libraries(React, Preact, Angular, Redux), Graphics(WebGL, ThreeJS, Image Processing and visualisation) and bachelor's in math. Semantics and accessibility are important for me. Take a look.`,
        img: `/assets/pages/preview.png`
    },{
        url: `/posts/`,
        title: `Articles I write`,
        ogTitle: `RomanistHere. Blog.`,
        description: `Articles I write. Some are about development, most are about life. You're going to find something interesting here, I'm sure.`,
        img: `/assets/pages/preview.png`
    },{
        url: `/apps/`,
        title: `Applications I develop`,
        ogTitle: `Non-commercial open-source applications.`,
        description: `Free applications for everyday use. Find something for yourself.`,
        img: `/assets/pages/preview.png`
    },{
        url: `/form/`,
        title: `Make me an offer`,
        ogTitle: `Make me an offer`,
        description: `Very special form I created. Please fill it.`,
        img: `/assets/pages/preview.png`
    }
]

export default () => [...staticData, ...dynamic]