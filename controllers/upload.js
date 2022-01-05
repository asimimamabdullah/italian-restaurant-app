const cloudinary = require("cloudinary");
const fs = require("fs");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

const upload = {
  uploadImage: async (req, res) => {
    // try {
    const file = req.files.file;

    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ success: false, error: "No Images Found" });

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
      return res
        .status(400)
        .json({ success: false, error: "Please Provide a valid format" });

    if (file.size > 1024 * 2048) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ error: "Size too large" });
    }

    await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Restaurant" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        // after upload we will have file temp that we can delete
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
          msg: "Success",
        });
      }
    );
  },

  destroyImage: async (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id)
        return res.status(400).json({ msg: "No images Selected" });

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({ msg: "Deleted image" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = upload;
