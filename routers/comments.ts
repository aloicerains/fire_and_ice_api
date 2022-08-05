import express from 'express'
import * as Comments from '../controllers/commentsMiddleware'

const router = express.Router();

router.get("/", Comments.getComments);
router.get("/book", Comments.getCommentsByBook);
router.get("/:id", Comments.getCommentById);
router.post("/", Comments.addComment);
router.put("/:id", Comments.updateComment);
router.delete("/:id", Comments.deleteComment);

export { router };