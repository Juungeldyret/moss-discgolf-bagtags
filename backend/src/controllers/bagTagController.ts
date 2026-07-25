import { Request, Response } from 'express';
import { BagTagModel } from '../models/BagTag';

export class BagTagController {
  static async getBagTagsBySeason(req: Request, res: Response) {
    try {
      const { season } = req.query;
      const seasonYear = season ? parseInt(season as string) : new Date().getFullYear();
      
      const bagTags = await BagTagModel.getBagTagsBySeason(seasonYear);
      res.json(bagTags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch bag tags' });
    }
  }

  static async getPlayerBagTag(req: Request, res: Response) {
    try {
      const { playerId } = req.params;
      const { season } = req.query;
      const seasonYear = season ? parseInt(season as string) : new Date().getFullYear();
      
      const bagTag = await BagTagModel.getPlayerBagTag(playerId, seasonYear);
      
      if (!bagTag) {
        return res.status(404).json({ error: 'Bag tag not found' });
      }
      
      res.json(bagTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch bag tag' });
    }
  }

  static async createBagTag(req: Request, res: Response) {
    try {
      const { player_id, tag_number, season_year } = req.body;
      
      if (!player_id || !tag_number || !season_year) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const bagTag = await BagTagModel.createBagTag({
        player_id,
        tag_number,
        current_rank: tag_number,
        wins: 0,
        draws: 0,
        losses: 0,
        total_rounds: 0,
        win_percentage: 0,
        season_year,
        achieved_date: new Date()
      });
      
      res.status(201).json(bagTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create bag tag' });
    }
  }

  static async updateBagTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const bagTag = await BagTagModel.updateBagTag(id, updates);
      
      if (!bagTag) {
        return res.status(404).json({ error: 'Bag tag not found' });
      }
      
      res.json(bagTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update bag tag' });
    }
  }

  static async getLeaderboard(req: Request, res: Response) {
    try {
      const { season } = req.query;
      const seasonYear = season ? parseInt(season as string) : new Date().getFullYear();
      
      const leaderboard = await BagTagModel.getLeaderboard(seasonYear);
      res.json(leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }
}
