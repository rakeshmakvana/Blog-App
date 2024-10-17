import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material';
import { authActions } from "../store";

export default function Header({ isSignup, setisSignup }) {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <AppBar position='sticky' className="header">
            <Toolbar>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png" alt="logo" width={100} />
                {isLoggedIn && (
                    <Box display="flex" margin="0 auto">
                        <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
                            <Tab label="All Blogs" LinkComponent={Link} to='/blogs' />
                            <Tab label="My Blogs" LinkComponent={Link} to='/myBlogs' />
                            <Tab label="Add Blog" LinkComponent={Link} to='/blogs/add' />
                        </Tabs>
                    </Box>
                )}
                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            <Button LinkComponent={Link} to='/auth'
                                onClick={() => setisSignup(false)}
                                variant="contained" className="header-button">Sign In</Button>
                            <Button LinkComponent={Link} to='/auth'
                                onClick={() => setisSignup(true)}
                                variant="contained" className="header-button">Sign Up</Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(authActions.signout())}
                            LinkComponent={Link} to='/auth'
                            variant="contained"
                            className="header-button">
                            Sign Out
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
