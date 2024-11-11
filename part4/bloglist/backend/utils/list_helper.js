const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum =  ((total, blog) => {
        return total + blog.likes
    })

    return blogs.length === 0 
    ? 0
    : total = blogs.reduce(sum, 0)
}

const favoriteBLog = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    
    let max = 0
    let favorite = null
    blogs.forEach(blog => {
        if (blog.likes > max){
            max = blog.likes,
            favorite = blog
        }
    })

    let blog = {
        title: favorite.title, 
        author: favorite.author,
        likes: favorite.likes
    }
    
    console.log(blog)

    return blog
}

module.exports =  {
    dummy,
    totalLikes,
    favoriteBLog
}