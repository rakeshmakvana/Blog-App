import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth({ isSignup, setisSignup }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const sendRequest = async (type = "signin") => {
        const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch((err) => console.log("axios error: " + err));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            sendRequest("signup").then((data) => {
                localStorage.setItem("userId", data.user._id);
                dispatch(authActions.signin());
                navigate("/blogs");
            }).catch(err => console.log(err));
        } else {
            sendRequest().then((data) => {
                localStorage.setItem("userId", data.user._id);
                dispatch(authActions.signin());
                navigate("/blogs");
            }).catch(err => console.log(err));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box className="auth-container">
                    <Typography className="auth-title">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Typography>
                    {isSignup && (
                        <TextField
                            margin="normal"
                            onChange={handleChange}
                            name="name"
                            placeholder="Name"
                            value={inputs.name}
                            fullWidth
                            variant="outlined"
                        />
                    )}
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={inputs.email}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={inputs.password}
                        fullWidth
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" className="auth-submit-button">
                        Submit
                    </Button>
                    <Typography className="auth-toggle">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <Button onClick={() => setisSignup(!isSignup)}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </Button>
                    </Typography>
                </Box>
            </form>
        </div>
    );
}
