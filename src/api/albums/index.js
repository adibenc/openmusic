const AlbumsHandler = require('./handler');
const baseRoutes = require('../base/base-routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler();
    server.route(baseRoutes("albums", albumsHandler));
  },
};
