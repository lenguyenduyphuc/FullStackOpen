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

module.exports =  {
    dummy,
    totalLikes
}