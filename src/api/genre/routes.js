const routes = (handler) => [
    {
      method: 'POST',
      path: '/genre',
      handler: handler.postGenreHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'GET',
      path: '/genre',
      handler: handler.getGenresHandler,
    },
    {
      method: 'GET',
      path: '/genre/{id}',
      handler: handler.getGenreByIdHandler,
    },
    {
      method: 'GET',
      path: '/genre/{id}/novel',
      handler: handler.getNovelByGenreHandler,
    },
    {
      method: 'PUT',
      path: '/genre/{id}',
      handler: handler.putGenreByIdHandler,
      options: {
        auth:"jwt",
      },
    },
    {
      method: 'DELETE',
      path: '/genre/{id}',
      handler: handler.deleteGenreByIdHandler,
      options: {
        auth:"jwt",
      },
    },
  ];
  
module.exports = routes;  