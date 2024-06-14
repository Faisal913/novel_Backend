require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Admin
const admin = require('./api/admin');
const AdminService = require('./services/postgres/AdminService');
const AdminValidator = require('./validator/admin');

// Novel
const novel = require('./api/novel');
const NovelService = require('./services/postgres/NovelService');
const NovelValidator = require('./validator/novel');

// Genre
const genre = require('./api/genre');
const GenreService = require('./services/postgres/GenreService');
const GenreValidator = require('./validator/genre');

// Chapter
const chapter = require('./api/chapter');
const ChapterService = require('./services/postgres/ChapterService');
const ChapterValidator = require('./validator/chapter');

// Authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  const adminService = new AdminService();
  const novelService = new NovelService();
  const genreService = new GenreService();
  const chapterService = new ChapterService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 14400, // 4 hours
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  
  await server.register([
    {
      plugin: admin,
      options: {
        service: adminService,
        validator: AdminValidator,
      },
    },
    {
      plugin: novel,
      options: {
        service: novelService,
        validator: NovelValidator,
      },
    },
    {
      plugin: genre,
      options: {
        service: genreService,
        validator: GenreValidator,
      },
    },
    {
      plugin: chapter,
      options: {
        service: chapterService,
        validator: ChapterValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        adminsService: adminService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  // rute untuk memastikan server berjalan
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: 'Server berhasil dijalankan' };
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});