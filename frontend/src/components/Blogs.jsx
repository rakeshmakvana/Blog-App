import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'

export default function Blogs() {
  const [blogs, setBlogs] = useState()

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blog").catch((err) => { console.log(err) });
    const data = await res.data;
    return data
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  }, [])

  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog isUser={localStorage.getItem('userId') === blog.user._id} blogId={blog._id}
          key={index} title={blog.title} description={blog.description} imageURL={blog.image} userName={blog.user.name} blog_Date={blog.updatedAt} />
      ))}
    </div>
  )
}
