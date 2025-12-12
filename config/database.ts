const path = require('path');

   module.exports = ({ env }) => ({
     connection: {
       client: env('DATABASE_CLIENT', 'postgres'),
       connection: {
         host: env('DATABASE_HOST', 'postgres'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME', 'strapi_db'),
         user: env('DATABASE_USERNAME', 'strapi_user'),
         password: env('DATABASE_PASSWORD', 'strapi_password_testflight'),
         ssl: env.bool('DATABASE_SSL', false),
       },
       debug: false,
     },
   });