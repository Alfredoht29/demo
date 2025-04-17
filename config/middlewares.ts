export default [
  {
    name: 'strapi::logger',
    config: {
      level: 'debug', // Ejemplo de configuración adicional
    }
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
      origin: ['http://209.38.139.117:3000', 'http://localhost:3000'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
