const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const moveUploadedFile = require("../../modul/function/fileManager/uploadFile.js");
//Logika Upload
const folderUpload = path.join(__dirname, "../../../support/tempUpFile");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderUpload);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });
//End Logika Upload
router.post("/", upload.single("uploadedFile"), async (req, res) => {
  try {
    const uploadedFile = req.file;
    const originalname = uploadedFile.originalname;
    const pathFolderFile = uploadedFile.path;
    const data = req.body;
    const passwordSudo = data.passwordSudo;
    const pathFile = data.pathFile;
    const tujuanFolder = pathFile.replace(/\/+/g, "/");

    const dataInput = {
      passwordSudo,
      originalname,
      pathFolderFile,
      tujuanFolder,
    };
    const moveFile = await moveUploadedFile(dataInput);
    return response(200, moveFile, "File Tersimpan!", res);
  } catch (error) {
    return response(500, null, "File Tidak Tersimpan!", res);
  }
});

module.exports = router;
