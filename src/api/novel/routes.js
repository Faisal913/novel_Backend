const routes = (handler) => [
    {
      method: 'POST',
      path: '/novel',
      handler: handler.postNovelHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'GET',
      path: '/novel',
      handler: handler.getNovelsHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'GET',
      path: '/novel/{id}',
      handler: handler.getNovelByIdHandler,
    },
    {
      method: 'PUT',
      path: '/novel/{id}',
      handler: handler.putNovelByIdHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'DELETE',
      path: '/novel/{id}',
      handler: handler.deleteNovelByIdHandler,
      options: {
        auth:"jwt",
      },
    },
  ];
  
  module.exports = routes;
  