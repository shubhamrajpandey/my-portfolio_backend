    const express = require('express');
    const { getMessage, addMessage, deleteMessage } = require('../controllers/messageContoller');
const { authMiddleware } = require('../middlewares/userMiddleware');

    const router = express.Router();

    router.get('/', authMiddleware,getMessage);
    router.post('/',addMessage);
    router.delete('/:id',authMiddleware,deleteMessage);

    module.exports = router;