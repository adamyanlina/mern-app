const router = require("express").Router();
const Message = require("../models/Message");

// new message
router.post('/', async (req, res) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text
    });
    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get messages of a conversation
router.get('/:conversationId', async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        });
        return res.status(200).json(message);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;
