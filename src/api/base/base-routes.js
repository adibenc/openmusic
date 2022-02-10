// BaseHandler-compatible route
// inject object handler inside yielded function
function injects(handler, ctxa){
  // r = request, h = handler
  return (r,h) => {
    return handler(r,h, ctxa)
  }
}

const routes = (name, handler) => {
  const basename = "/" + name

  return [
    {
      method: 'POST',
      path: basename,
      handler: injects(handler.post, handler),
    },
    {
      method: 'GET',
      path: basename,
      handler: injects(handler.all, handler),
    },
    {
      method: 'GET',
      path: basename + '/{id}',
      handler: injects(handler.single, handler),
    },
    {
      method: 'PUT',
      path: basename + '/{id}',
      handler: injects(handler.update, handler),
  
    },
    {
      method: 'DELETE',
      path: basename + '/{id}',
      handler: injects(handler.delete, handler),
    },
  ];
}

module.exports = routes;
