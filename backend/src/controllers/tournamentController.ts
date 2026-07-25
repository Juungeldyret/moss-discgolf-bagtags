import { Request, Response } from 'express';
import { TournamentModel } from '../models/Tournament';

export class TournamentController {
  static async getAllTournaments(req: Request, res: Response) {
    try {
      const tournaments = await TournamentModel.getAllTournaments();
      res.json(tournaments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch tournaments' });
    }
  }

  static async getTournamentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tournament = await TournamentModel.getTournamentById(id);
      
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }
      
      res.json(tournament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch tournament' });
    }
  }

  static async createTournament(req: Request, res: Response) {
    try {
      const { name, description, tournament_date, location, format } = req.body;
      
      if (!name || !tournament_date) {
        return res.status(400).json({ error: 'Name and tournament_date are required' });
      }
      
      const tournament = await TournamentModel.createTournament({
        name,
        description,
        tournament_date: new Date(tournament_date),
        location,
        format,
        is_active: true
      });
      
      res.status(201).json(tournament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create tournament' });
    }
  }

  static async updateTournament(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const tournament = await TournamentModel.updateTournament(id, updates);
      
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }
      
      res.json(tournament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update tournament' });
    }
  }
}
