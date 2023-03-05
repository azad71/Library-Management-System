const fs = require("fs");

const deleteImage = (imagePath, next) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log("Failed to delete image at delete profile");
      return;
    }
  });
};

module.exports = deleteImage;
