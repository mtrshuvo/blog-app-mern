import Post from '../post/Post'
import './posts.css'

function Posts({posts}) {
    return (
        <div className="posts" >
            {
                posts.map(p => (
<Post key={p._id} post={p} />
                ))
            }
            
      
        </div>
    )
}

export default Posts
