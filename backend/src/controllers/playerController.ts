import { Request, Response } from 'express';
import { PlayerModel } from '../models/Player';

export class PlayerController {
  static async getAllPlayers(req: Request, res: Response) {
    try {
      const players = await PlayerModel.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  }

  static async getPlayerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const player = await PlayerModel.getPlayerById(id);
      
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }
      
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch player' });
    }
  }

  static async createPlayer(req: Request, res: Response) {
    try {
      const { name, email, phone, pdga_number } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      
      const player = await PlayerModel.createPlayer({
        name,
        email,
        phone,
        pdga_number,
        member_since: new Date(),
        is_active: true
      });
      
      res.status(201).json(player);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create player' });
    }
  }

  static async updatePlayer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const player = await PlayerModel.updatePlayer(id, updates);
      
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }
      
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update player' });
    }
  }

  static async deletePlayer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const deleted = await PlayerModel.deletePlayer(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Player not found' });
      }
      
      res.json({ message: 'Player deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete player' });
    }
  }
}
