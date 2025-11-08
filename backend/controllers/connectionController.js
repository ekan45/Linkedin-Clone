import Connection from '../models/Connection.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Send connection request
// @route   POST /api/connections/send/:userId
// @access  Private
export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    // Check if trying to connect with self
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot connect with yourself' });
    }

    // Check if user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    });

    if (existingConnection) {
      if (existingConnection.status === 'accepted') {
        return res.status(400).json({ message: 'You are already connected' });
      }
      if (existingConnection.status === 'pending') {
        return res.status(400).json({ message: 'Connection request already sent' });
      }
    }

    // Create connection request
    const connection = await Connection.create({
      sender: req.user._id,
      receiver: userId,
      message: message || '',
      status: 'pending'
    });

    // Create notification
    await Notification.create({
      recipient: userId,
      sender: req.user._id,
      type: 'connection_request',
      message: `${req.user.name} sent you a connection request`
    });

    res.status(201).json({
      success: true,
      message: 'Connection request sent successfully',
      connection
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Accept connection request
// @route   PUT /api/connections/accept/:connectionId
// @access  Private
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    // Check if user is the receiver
    if (connection.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to accept this request' });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ message: 'Connection request is not pending' });
    }

    // Update connection status
    connection.status = 'accepted';
    await connection.save();

    // Add to connections array in both users
    await User.findByIdAndUpdate(connection.sender, {
      $addToSet: { connections: connection.receiver }
    });

    await User.findByIdAndUpdate(connection.receiver, {
      $addToSet: { connections: connection.sender }
    });

    // Create notification
    await Notification.create({
      recipient: connection.sender,
      sender: req.user._id,
      type: 'connection_accepted',
      message: `${req.user.name} accepted your connection request`
    });

    res.json({
      success: true,
      message: 'Connection request accepted',
      connection
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Decline connection request
// @route   PUT /api/connections/decline/:connectionId
// @access  Private
export const declineConnectionRequest = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    // Check if user is the receiver
    if (connection.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to decline this request' });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ message: 'Connection request is not pending' });
    }

    // Update connection status
    connection.status = 'declined';
    await connection.save();

    res.json({
      success: true,
      message: 'Connection request declined',
      connection
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending connection requests
// @route   GET /api/connections/requests
// @access  Private
export const getConnectionRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      receiver: req.user._id,
      status: 'pending'
    })
      .populate('sender', 'name email profilePhoto headline')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's connections
// @route   GET /api/connections
// @access  Private
export const getConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('connections', 'name email profilePhoto headline location');

    res.json({
      success: true,
      count: user.connections.length,
      connections: user.connections
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove connection
// @route   DELETE /api/connections/:userId
// @access  Private
export const removeConnection = async (req, res) => {
  try {
    const { userId } = req.params;

    // Remove from both users' connections
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { connections: userId }
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { connections: req.user._id }
    });

    // Update connection status
    await Connection.findOneAndUpdate(
      {
        $or: [
          { sender: req.user._id, receiver: userId },
          { sender: userId, receiver: req.user._id }
        ],
        status: 'accepted'
      },
      { status: 'declined' }
    );

    res.json({
      success: true,
      message: 'Connection removed successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get connection suggestions
// @route   GET /api/connections/suggestions
// @access  Private
export const getConnectionSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const userConnections = currentUser.connections;

    // Find users who are not:
    // 1. Current user
    // 2. Already connected
    // 3. Have pending requests
    const pendingConnections = await Connection.find({
      $or: [
        { sender: req.user._id, status: 'pending' },
        { receiver: req.user._id, status: 'pending' }
      ]
    });

    const pendingUserIds = pendingConnections.map(conn => 
      conn.sender.toString() === req.user._id.toString() ? conn.receiver : conn.sender
    );

    const excludeIds = [
      req.user._id,
      ...userConnections,
      ...pendingUserIds
    ];

    // Get suggestions (users with mutual connections or similar skills)
    const suggestions = await User.find({
      _id: { $nin: excludeIds }
    })
      .select('name email profilePhoto headline location skills')
      .limit(10);

    res.json({
      success: true,
      count: suggestions.length,
      suggestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get connection status with a user
// @route   GET /api/connections/status/:userId
// @access  Private
export const getConnectionStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if connected
    const currentUser = await User.findById(req.user._id);
    const isConnected = currentUser.connections.includes(userId);

    if (isConnected) {
      return res.json({
        success: true,
        status: 'connected'
      });
    }

    // Check for pending requests
    const connection = await Connection.findOne({
      $or: [
        { sender: req.user._id, receiver: userId, status: 'pending' },
        { sender: userId, receiver: req.user._id, status: 'pending' }
      ]
    });

    if (connection) {
      const isPending = connection.sender.toString() === req.user._id.toString();
      return res.json({
        success: true,
        status: isPending ? 'request_sent' : 'request_received',
        connectionId: connection._id
      });
    }

    res.json({
      success: true,
      status: 'not_connected'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
