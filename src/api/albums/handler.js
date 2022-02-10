const BaseHandler = require('../base/base-handler');

class AlbumsHandler extends BaseHandler{
  constructor(service, schema, validator) {
    super(service, schema, validator)
    
    this.baseBind()
  }
}

module.exports = AlbumsHandler;
