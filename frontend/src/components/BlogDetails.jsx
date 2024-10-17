import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, InputLabel, Button } from '@mui/material';

export default function BlogDetails() {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const data = await res.data;
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          imageURL: data.blog.image,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL
      });
      return await res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs/"));
  };

  return (
    <div className="blog-details-container">
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box className="form-box">
            <Typography className="form-title">Edit Your Blog</Typography>
            <InputLabel className="input-label">Title</InputLabel>
            <TextField
              className="input-field"
              variant="outlined"
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <InputLabel className="input-label">Description</InputLabel>
            <TextField
              className="input-field"
              variant="outlined"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <InputLabel className="input-label">Image URL</InputLabel>
            <TextField
              className="input-field"
              variant="outlined"
              name="imageURL"
              value={inputs.imageURL}
              onChange={handleChange}
            />
            <Button className="submit-button" variant="contained" type="submit">
              Update Blog
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}
