const express = require("express");

const router = express.Router();
const { roleVerify } = require("../app/middlewares/roleMiddleware");
const PostsController = require("../app/controllers/PostsController.controller");
const { uploadImage } = require("../config/multer");

const {uploadNewPost, editPost, deletePost, sharePost, uploadComment, editComment, deleteComment, getListPosts, getPostsById, getListCommentByPostId} = PostsController

router.post("/upload", uploadImage.array("media"), uploadNewPost)
router.put("/edit/:id", uploadImage.array("media"), editPost)
router.delete("/delete/:id", deletePost)
router.post("/share/:id", sharePost)
router.post("/comment/upload/:postId", uploadComment)
router.put("/comment/edit/:commentId", editComment)
router.delete("/comment/delete/:commentId", deleteComment)

router.get("/get-list", getListPosts)
router.get("/get-id/:id", getPostsById)
router.get("/get-comment/:id", getListCommentByPostId)

module.exports = router;