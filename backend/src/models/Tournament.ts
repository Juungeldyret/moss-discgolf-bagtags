import pool from '../db';
import { v4 as uuidv4 } from 'uuid';

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  tournament_date: Date;
  location?: string;
  format?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class TournamentModel {
  static async getAllTournaments(): Promise<Tournament[]> {
    const result = await pool.query('SELECT * FROM tournaments ORDER BY tournament_date DESC');
    return result.rows;
  }

  static async getTournamentById(id: string): Promise<Tournament | null> {
    const result = await pool.query('SELECT * FROM tournaments WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async createTournament(data: Omit<Tournament, 'id' | 'created_at' | 'updated_at'>): Promise<Tournament> {
    const id = uuidv4();
    const now = new Date();
    
    const result = await pool.query(
      `INSERT INTO tournaments (id, name, description, tournament_date, location, format, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, data.name, data.description || null, data.tournament_date, data.location || null, data.format || null, data.is_active !== false, now, now]
    );
    
    return result.rows[0];
  }

  static async updateTournament(id: string, data: Partial<Tournament>): Promise<Tournament | null> {
    const now = new Date();
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    
    if (fields.length === 0) return this.getTournamentById(id);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = fields.map(field => data[field as keyof Tournament]);
    
    const result = await pool.query(
      `UPDATE tournaments SET ${setClause}, updated_at = $${fields.length + 1} WHERE id = $${fields.length + 2} RETURNING *`,
      [...values, now, id]
    );
    
    return result.rows[0] || null;
  }
}
