import Article from "../models/article.js"
import { errorJson } from '../error.js';

const NUMBER_OF_BLOGS_PER_PAGE = 20;

export const getAllBlogs = async (req, res) => {
  try {
    const page = req.query?.page ?? 1;
    const skip =  (NUMBER_OF_BLOGS_PER_PAGE * page) - NUMBER_OF_BLOGS_PER_PAGE;
  
    const articles = await Article.find({}, undefined, { skip, limit: NUMBER_OF_BLOGS_PER_PAGE });
  
    res.json(articles)
  } catch (error) {
    return errorJson(res, error)
  }
};


export const getAllUserBlogs = async (req, res) => {
  try {
    const { user } = req;

    const page = req.query?.page ?? 1;
    const skip =  (NUMBER_OF_BLOGS_PER_PAGE * page) - NUMBER_OF_BLOGS_PER_PAGE;
  
    const articles = await Article.find({ author: user._id }).skip(skip).limit(NUMBER_OF_BLOGS_PER_PAGE).exec();
  
    res.json(articles) 
  } catch (error) {
    return errorJson(res, error)
  }
};


export const getArticle = async (req, res) => {
  try {
    const { blogId } = req.params;

    const article = await Article.findByIdAndUpdate(
      blogId,
      { $inc: { read_count: 1 } },
      { new: true }
    );
  
    res.json(article)
  } catch (error) {
    return errorJson(res, error)
  }
};

export const createArticle = async (req, res) => {
  try {
    const { user } = req;

    const toCreate = new Article({ 
      title: req.body.title,
      description: req.body.description,
      author: user._id,
      reading_time: 0,
      tags: req.body.tags ?? [],
      body: req.body.body,
    });
  
    const article = await Article.create(toCreate);
  
    res.json(article)
  } catch (error) {
    return errorJson(res, error)
  }
};

export const editArticle = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { user, body } = req;
  
    const newArticleData = { 
      title: body.title,
      description: body.description,
      tags: body.tags ?? [],
      body: body.body,
    };
  
    const updated = await Article.updateOne(
      { _id: blogId, author: user._id },
      { $set: newArticleData },
      { new: true }
    );
  
    if (updated.matchedCount === 0) {
      throw new Error("No article found or you're not the author" );
    }
  
    res.json({ message: 'Article successfully updated' });
  } catch (error) {
    return errorJson(res, error)
  }
};


export const publishArticle = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { user } = req;
  
    const updated = await Article.updateOne(
      { _id: blogId, author: user._id },
      { $set: { state: 'published' } },
      { new: true }
    );
  
    // Check if the update was successful
    if (updated.matchedCount === 0) {
      throw new Error("No article found or you're not the author" );
    }
  
    res.json({ message: 'Article successfully published' });
  } catch (error) {
    return errorJson(res, error)
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { user } = req;
  
    const result = await Article.deleteOne({ _id: blogId, author: user._id });
  
    if (result.deletedCount === 0) {
      throw new Error("No article found or you're not the author" );
    }
  
    res.json({ message: 'Article successfully deleted' });
  } catch (error) {
    return errorJson(res, error)
  }
};