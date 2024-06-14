/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    access_token: {
      type: 'TEXT',
      notNull: true,
    },
    refresh_token: {
      type: 'TEXT',
      notNull: true,
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
