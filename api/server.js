const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const userRouter = require('../router/users/userRouter');
const authRouter = require('../router/authRouter');
const auth = require('../utils/auth');

const server = express();

const sessionConfig = {
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: process.env.SECURE_COOKIE || false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
	name: 'duck',
	secret: process.env.COOKIE_SECRET || 'huntinthesky'
};

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());

server.use('/api/users', auth, userRouter);
server.use('/api/auth', authRouter);

module.exports = server;
