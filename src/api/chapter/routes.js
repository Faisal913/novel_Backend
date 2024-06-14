const routes = (handler) => [
    {
      method: 'POST',
      path: '/chapter',
      handler: handler.postChapterHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'GET',
      path: '/chapter/{id}',
      handler: handler.getChapterByIdHandler,
    },
    {
      method: 'GET',
      path: '/chapter',
      handler: handler.getChaptersHandler,
    },
    {
      method: 'PUT',
      path: '/chapter/{id}',
      handler: handler.putChapterByIdHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'DELETE',
      path: '/chapter/{id}',
      handler: handler.deleteChapterByIdHandler,
      options: {
        auth:"jwt",
      },
    },
  ];
  
module.exports = routes;