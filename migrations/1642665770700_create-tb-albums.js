/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
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
  pgm.dropTable('albums');
};
