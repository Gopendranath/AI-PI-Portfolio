const { createImage, getImage } = require('../utils/imageResponse.js');
const { main } = require('../utils/chatResponse.js');

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
        
        const imageUrl = await getImage(response.id);

        const imageJson = { 
            imageId: response.id,
            imageUrl,
         };
    
        res.json(imageJson);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

module.exports = { chatResponse, imageResponse };