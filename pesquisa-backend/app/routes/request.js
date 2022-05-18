const express = require('express');
const router = express();
const authMiddleware = require("../middlewares/auth");
const os = require("os");
const multer = require("multer");
const upload = multer({ dest: os.tmpdir() });
const RequestController = require("../controllers/request");
const request = new RequestController();

router.post(
  "/make_request",
  authMiddleware,
  upload.single("file"),
  request.makeRequest.bind(request)
);

router.get(
  "/list_request",
  authMiddleware,
  request.listRequest.bind(request)
);

module.exports = router;
