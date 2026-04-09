export default [
  {
    name: 'strapi::logger',
    config: {
      level: 'debug',
    },
  },
  {
    name: 'strapi::errors',
    config: {},
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];