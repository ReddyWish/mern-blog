# mern-blog
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# MERN Blog - Advanced Backend with Token Rotation and State Management with Redux Toolkit
 [Check this out] https://merny.onrender.com/


## Overview

This is a full-stack blog application built on the MERN (MongoDB, Express, React, Node.js) stack. The backend is equipped with advanced security features such as token rotation and token reuse detection. The frontend uses Redux Toolkit for state management. The blog provides three different user roles: Admin, Editor, and User, each with specific permissions and functionalities.

## Features

- **User Authentication**: Users can register, login, and logout with secure authentication using JWT (JSON Web Tokens).
- **Token Rotation**: The backend implements token rotation to enhance security by periodically refreshing the user's access token.
- **Token Reuse Detection**: The application detects and prevents token reuse to mitigate security risks.
- **Authorization Roles**:
    - **Admin**: Can create, delete, and edit posts and comments as well. Additionally, an Admin can delete a user along with all their posts.
    - **Editor**: Can create, delete, and edit posts and comments.
    - **User**: Can create, read, and edit their own posts and comments.
- **Pre-Registered Users**: For demonstration purposes, three pre-registered users are available to test the different roles and functionalities.

## Pre-Registered Users

You can use the following pre-registered users to test the blog application:

1. **Admin**:
    - Username: James
    - Password: zaq123ZAQ$

2. **Editor**:
    - Username: Jessica
    - Password: zaq123ZAQ$

3. **User**:
    - Username: Thomas
    - Password: zaq123ZAQ$
