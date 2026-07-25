import pool from '../db';
import { v4 as uuidv4 } from 'uuid';

export interface BagTag {
  id: string;
  player_id: string;
  tag_number: number;
  current_rank: number;
  wins: number;
  draws: number;
  losses: number;
  total_rounds: number;
  win_percentage: number;
  season_year: number;
  achieved_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export class BagTagModel {
  static async getBagTagsBySeason(seasonYear: number): Promise<BagTag[]> {
    const result = await pool.query(
      `SELECT bt.*, p.name FROM bag_tags bt
       JOIN players p ON bt.player_id = p.id
       WHERE bt.season_year = $1
       ORDER BY bt.tag_number ASC`,
      [seasonYear]
    );
    return result.rows;
  }

  static async getPlayerBagTag(playerId: string, seasonYear: number): Promise<BagTag | null> {
    const result = await pool.query(
      'SELECT * FROM bag_tags WHERE player_id = $1 AND season_year = $2',
      [playerId, seasonYear]
    );
    return result.rows[0] || null;
  }

  static async createBagTag(data: Omit<BagTag, 'id' | 'created_at' | 'updated_at'>): Promise<BagTag> {
    const id = uuidv4();
    const now = new Date();
    
    const result = await pool.query(
      `INSERT INTO bag_tags (id, player_id, tag_number, current_rank, wins, draws, losses, total_rounds, win_percentage, season_year, achieved_date, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [id, data.player_id, data.tag_number, data.current_rank || null, data.wins || 0, data.draws || 0, data.losses || 0, data.total_rounds || 0, data.win_percentage || 0, data.season_year, data.achieved_date || null, now, now]
    );
    
    return result.rows[0];
  }

  static async updateBagTag(id: string, data: Partial<BagTag>): Promise<BagTag | null> {
    const now = new Date();
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    
    if (fields.length === 0) {
      const result = await pool.query('SELECT * FROM bag_tags WHERE id = $1', [id]);
      return result.rows[0] || null;
    }
    
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = fields.map(field => data[field as keyof BagTag]);
    
    const result = await pool.query(
      `UPDATE bag_tags SET ${setClause}, updated_at = $${fields.length + 1} WHERE id = $${fields.length + 2} RETURNING *`,
      [...values, now, id]
    );
    
    return result.rows[0] || null;
  }

  static async getLeaderboard(seasonYear: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT 
        bt.tag_number as rank,
        p.name as player_name,
        bt.wins,
        bt.draws,
        bt.losses,
        bt.total_rounds,
        bt.win_percentage,
        p.id as player_id
       FROM bag_tags bt
       JOIN players p ON bt.player_id = p.id
       WHERE bt.season_year = $1
       ORDER BY bt.tag_number ASC`,
      [seasonYear]
    );
    return result.rows;
  }
}
