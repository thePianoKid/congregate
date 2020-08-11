import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './App.css'

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className="post-avatar">
                    { username[0].toUpperCase() }
                </Avatar>
                <h3>{ username }</h3>
            </div>
            <img className="post-image" src={ imageUrl }></img>
            <h4 className="post-text"> <strong>{ username }:</strong> { caption } </h4>
        </div>
    )
}

export default Post
