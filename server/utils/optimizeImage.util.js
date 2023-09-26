const sharp = require("sharp");

const optimizeImage = async (image) => {
  try {
    const optimizedImage = await sharp(image)
      .webp({ nearLossless: true })
      .toBuffer();

    return optimizedImage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = optimizeImage;
