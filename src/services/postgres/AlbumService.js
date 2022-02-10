const BaseService = require("./BaseService")
const { nanoid } = require('nanoid');

class AlbumService extends BaseService{
  /*
  id,
  name,
  year,
  created_at
  updated_at
  */

  allQuery = `select * from albums`

  insertQuery = `INSERT INTO albums (name, year, created_at, updated_at)
  VALUES($1, $2, $3, $4) RETURNING id`
  
  singleQuery = `SELECT albums.*
  FROM albums 
  WHERE albums.id = $1`

  updateQuery = 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id'

  deleteQuery = 'DELETE FROM albums WHERE id = $1 RETURNING id'

  constructor(collaborationService = null, cacheService = null) {
    super(collaborationService, cacheService)
  }
  
  getInsertData({name, year,}){
    // const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    return [name, year, createdAt, updatedAt];
  }
  
  getUpdateData(id, {name, year, }){
    const updatedAt = new Date().toISOString();
    return [name, year, updatedAt, id];
  }
  
}

module.exports = AlbumService;
