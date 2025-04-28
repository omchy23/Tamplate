import express from 'express';
import { addCategory, getCategories } from '../controllers/category.controller.js';

const router = express.Router();

// Route to add a new category
router.post('/add', addCategory);

// Route to get all categories
router.get('/getCategory', getCategories);


export default router;
