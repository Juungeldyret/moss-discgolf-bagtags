import { Router } from 'express';
import { BagTagController } from '../controllers/bagTagController';

const router = Router();

router.get('/leaderboard', BagTagController.getLeaderboard);
router.get('/', BagTagController.getBagTagsBySeason);
router.get('/player/:playerId', BagTagController.getPlayerBagTag);
router.post('/', BagTagController.createBagTag);
router.put('/:id', BagTagController.updateBagTag);

export default router;
