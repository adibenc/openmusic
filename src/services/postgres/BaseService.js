const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapDBToModel } = require('../../utils');

class BaseService {
  insertQuery = `INSERT INTO notes 
  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`
  
  singleQuery = `SELECT notes.*, users.username
  FROM notes
  LEFT JOIN users ON users.id = notes.owner
  WHERE notes.id = $1`

  updateQuery = 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id, owner'

  deleteQuery = 'DELETE FROM notes WHERE id = $1 RETURNING id, owner'

  constructor(collaborationService = null, cacheService = null) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
    this._cacheService = cacheService;
  }
  
  getInsertData({title, body, tags, owner,}){
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    return [id, title, body, tags, createdAt, updatedAt, owner];
  }
  
  getUpdateData({title, body, tags, }){
    const updatedAt = createdAt;
    return [title, body, tags, updatedAt, id];
  }
  
  async create(obj) {
    const query = {
      text: this.insertQuery,
      values: this.getInsertData(obj),
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async single(id) {
    const query = {
      text: this.singleQuery,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async update(id, obj) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: this.updateQuery,
      values: this.getUpdateData(obj),
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui. Id tidak ditemukan');
    }

    const { owner } = result.rows[0];
  }

  async delete(id) {
    const query = {
      text: this.deleteQuery,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal dihapus. Id tidak ditemukan');
    }

    const { owner } = result.rows[0];
  }
}

module.exports = BaseService;
