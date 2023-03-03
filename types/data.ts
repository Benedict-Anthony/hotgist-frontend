export type postTypes = {
    id: number
    excerpt: string
    title:string
    image_url:string
    slug: string
    body:string
    
    created_at:string
    is_published: boolean
    author: {
        id: number
        full_name:string
    }
    publisher: {
        id: number
        full_name: string
        is_publisher:boolean
    }
}

export type postDetail = {
    post:postTypes
}

export type postListTypes = {
    posts:postTypes[]
}