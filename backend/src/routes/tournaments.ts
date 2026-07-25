import { Router } from 'express';
import { TournamentController } from '../controllers/tournamentController';

const router = Router();

router.get('/', TournamentController.getAllTournaments);
router.get('/:id', TournamentController.getTournamentById);
router.post('/', TournamentController.createTournament);
router.put('/:id', TournamentController.updateTournament);

export default router;
