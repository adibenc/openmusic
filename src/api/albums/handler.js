const BaseHandler = require('../base/base-handler');

class AlbumsHandler extends BaseHandler{
  constructor() {
    super()
    // this._service = service;
    // this._validator = validator;
    this.baseBind()
  }
}

module.exports = AlbumsHandler;
