const AlbumsHandler = require('./handler');
const baseRoutes = require('../base/base-routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, schema, validator }) => {
    const albumsHandler = new AlbumsHandler(service, schema, validator);
    server.route(baseRoutes("albums", albumsHandler));
  },
};
