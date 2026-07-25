import pool from '../db';
import { v4 as uuidv4 } from 'uuid';

export interface Player {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  pdga_number?: string;
  member_since: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PlayerModel {
  static async getAllPlayers(): Promise<Player[]> {
    const result = await pool.query('SELECT * FROM players ORDER BY name ASC');
    return result.rows;
  }

  static async getPlayerById(id: string): Promise<Player | null> {
    const result = await pool.query('SELECT * FROM players WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async createPlayer(data: Omit<Player, 'id' | 'created_at' | 'updated_at'>): Promise<Player> {
    const id = uuidv4();
    const now = new Date();
    
    const result = await pool.query(
      `INSERT INTO players (id, name, email, phone, pdga_number, member_since, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, data.name, data.email || null, data.phone || null, data.pdga_number || null, data.member_since || now, data.is_active !== false, now, now]
    );
    
    return result.rows[0];
  }

  static async updatePlayer(id: string, data: Partial<Player>): Promise<Player | null> {
    const now = new Date();
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    
    if (fields.length === 0) return this.getPlayerById(id);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = fields.map(field => data[field as keyof Player]);
    
    const result = await pool.query(
      `UPDATE players SET ${setClause}, updated_at = $${fields.length + 1} WHERE id = $${fields.length + 2} RETURNING *`,
      [...values, now, id]
    );
    
    return result.rows[0] || null;
  }

  static async deletePlayer(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM players WHERE id = $1', [id]);
    return result.rowCount! > 0;
  }
}
