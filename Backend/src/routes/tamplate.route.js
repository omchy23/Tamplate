import express from 'express';
import { createTemplate, getAllTemplates } from '../controllers/tamplate.controller.js';

const router = express.Router();

// Admin uploads a template
router.post('/templates', createTemplate);

// Frontend fetches templates
router.get('/templates', getAllTemplates);

export default router;
