const mongoose = require("mongoose");

const imageLinksSchema = new mongoose.Schema({
    imageId: String,
    prompt: String,
    imageUrl: String,
});

const ImageModel = mongoose.model("Image", imageLinksSchema);

module.exports = { ImageModel };