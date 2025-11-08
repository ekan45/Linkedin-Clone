import express from 'express';
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  getConnectionRequests,
  getConnections,
  removeConnection,
  getConnectionSuggestions,
  getConnectionStatus
} from '../controllers/connectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/send/:userId', sendConnectionRequest);
router.put('/accept/:connectionId', acceptConnectionRequest);
router.put('/decline/:connectionId', declineConnectionRequest);
router.get('/requests', getConnectionRequests);
router.get('/suggestions', getConnectionSuggestions);
router.get('/status/:userId', getConnectionStatus);
router.get('/', getConnections);
router.delete('/:userId', removeConnection);

export default router;
