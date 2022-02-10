/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: false,
    },
    album_id: {
      type: 'integer',
      notNull: false,
      references: '"albums"',
    },
    created_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
