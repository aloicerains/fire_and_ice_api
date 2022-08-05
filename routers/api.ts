import express from 'express'
import * as api from '../controllers/booksMiddleware'

const router = express.Router();

router.get("/", api.getBooks);
router.get("/:id", api.getCharacters);

export { router };