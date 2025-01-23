const { createImage, getImage } = require('../utils/imageResponse.js');
const { main } = require('../utils/chatResponse.js');
const { ImageModel } = require('../models/imageModel.js');

const chatResponse = async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await main(prompt);
        const processedMessage = `Response: ${response}`;
        res.send(processedMessage);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to process the request' });
    }

}

const imageResponse = async (req, res) => {
    const prompt = req.body.prompt;


    if (!prompt) {
        return res.status(400).send('Prompt is required');
      }
    
      try {
        const response = await createImage(prompt);

        await new Promise(resolve => setTimeout(resolve, 1000*5));

        const imagedata = new ImageModel({ imageId: response.id, prompt: prompt });
        await imagedata.save();
        
        res.json(imagedata);

        getImage(response.id);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

const getImageUrl = async (req, res) => {
    const completeStatus = true;
    const { id } = req.params;
    const image = await ImageModel.findOne({ imageId: id });

    if (image && image.imageUrl) {
        res.json({ imageUrl: image.imageUrl, completeStatus: completeStatus });
      } else {
        res.json({ error: 'Image not found', completeStatus: !completeStatus });
      }
  };

module.exports = { chatResponse, imageResponse, getImageUrl };