const Message = require("../models/messageModel");
const { sendNewMessageEmail } = require("../utils/email");

exports.getMessage = async (req, res) => {
  try {
    const msg = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Message retrieved successfully",
      data: msg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: msg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const msg = await Message.create(req.body);

    await sendNewMessageEmail(msg);

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: msg,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};