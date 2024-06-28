import express from 'express';
import db from './db.js';
import loggerMiddleware from './middleware/logger.js'
import authMiddleWare from './middleware/auth.js';
import errorHandlerMiddleWare from './middleware/error-handler.js';
import * as userController from './controllers/user.js'
import * as articleController from './controllers/article.js'
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import passport from 'passport';
import User from './models/user.js';
import { createValidator } from 'express-joi-validation';

const app = express();
const validator = createValidator({})


db.connect()

const jwtStrategy = authMiddleWare.strategy();

app.use(bodyParser.json());
app.use(loggerMiddleware)

passport.use(jwtStrategy);
passport.use(new LocalStrategy({ usernameField: 'email', session: false }, User.authenticate()));
passport.serializeUser(User.serializeUser());

app.use(passport.initialize());

app.post('/user/login',passport.authenticate('local', { session: false }), userController.login)
app.post('/user/register', validator.body(userController.RegisterSchema), userController.register)

app.get('/blogs', articleController.getAllBlogs)
app.get('/user/blogs', passport.authenticate('jwt', { session: false }), articleController.getAllUserBlogs)

app.post('/blogs', passport.authenticate('jwt', { session: false }), validator.body(articleController.CreateArticleSchema), articleController.createArticle)

app.get('/blog/:blogId', articleController.getArticle)
app.post('/blog/:blogId/edit', passport.authenticate('jwt', { session: false }), validator.body(articleController.EditArticleSchema), articleController.editArticle)
app.post('/blog/:blogId/publish', passport.authenticate('jwt', { session: false }), articleController.publishArticle)
app.post('/blog/:blogId/delete', passport.authenticate('jwt', { session: false }), articleController.deleteArticle)


app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
