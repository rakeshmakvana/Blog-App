import React, { useState } from 'react';
import { Box, Typography, TextField, InputLabel, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem("userId")
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  };

  return (
    <div className="add-blog-container">
      <form onSubmit={handleSubmit}>
        <Box className="form-box">
          <Typography className="form-title">
            Create Your Blog
          </Typography>
          <InputLabel className="input-label">Title</InputLabel>
          <TextField className="input-field" variant="outlined" name="title" value={inputs.title} onChange={handleChange} />

          <InputLabel className="input-label">Description</InputLabel>
          <TextField className="input-field" variant="outlined" name="description" value={inputs.description} onChange={handleChange} multiline rows={4} />

          <InputLabel className="input-label">Image URL</InputLabel>
          <TextField className="input-field" variant="outlined" name="imageURL" value={inputs.imageURL} onChange={handleChange} />

          <Button className="submit-button" variant="contained" type="submit">
            Post Blog
          </Button>
        </Box>
      </form>
    </div>
  );
}
