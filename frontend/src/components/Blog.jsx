import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, CardHeader, CardMedia, Avatar, IconButton, Chip, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function Blog({ title, description, imageURL, userName, isUser, blogId, blog_Date, tags }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dateFromMongo = moment(blog_Date);
  const formattedDate = dateFromMongo.isValid() ? dateFromMongo.format('DD/MM/YYYY hh:mm A') : "Invalid Date";

  const handleEdit = () => {
    navigate(`/myBlogs/${blogId}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/blog/${blogId}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    await deleteRequest();
    navigate("/blogs");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="blog-container">
      <Card className="blog-card">
        {isUser && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleEdit} className="edit-icon">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} className="delete-icon">
              <DeleteIcon />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar className="avatar">
              {userName.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
            </Avatar>
          }
          title={title}
          subheader={formattedDate}
          titleTypographyProps={{ className: 'blog-title' }}
          subheaderTypographyProps={{ className: 'blog-date' }}
        />

        <CardMedia
          component="img"
          image={imageURL}
          alt="Blog Image"
          className="blog-image"
        />

        <CardContent>
          {/* Tags */}
          <Box className="tag-container">
            {tags && tags.map((tag, index) => (
              <Chip key={index} label={tag} className="tag-chip" />
            ))}
          </Box>

          <Typography variant="body2" className="blog-description">
            <b>{userName}</b>{": "} {description}
          </Typography>

          <Box className="interaction-icons">
            <IconButton className="share-icon" onClick={handleOpen}>
              <VisibilityIcon />
            </IconButton>
            <IconButton className="like-icon">
              <FavoriteIcon />
            </IconButton>
            <IconButton className="comment-icon">
              <ChatIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Modal for viewing the blog */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-content">
          <Card>
            <CardHeader
              avatar={
                <Avatar className="avatar">
                  {userName.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                </Avatar>
              }
              title={title}
              subheader={formattedDate}
            />
            <CardMedia
              component="img"
              image={imageURL}
              alt="Blog Image"
            />
            <CardContent>
              <Typography variant="h6" className="modal-description">
                <b>{userName}</b>{": "} {description}
              </Typography>
              <Box className="tag-container">
                {tags && tags.map((tag, index) => (
                  <Chip key={index} label={tag} className="tag-chip" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
