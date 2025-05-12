import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::promotion.promotion',
  ({ strapi }) => ({
    async find(ctx) {
      const { weekDay } = ctx.query;

      const existingFilters = (ctx.query.filters as Record<string, any>) || {};

      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).toISOString();

      console.log('Debug: todayStart =', todayStart);

      ctx.query.filters = {
        ...existingFilters,
        expirationDate: { $gte: todayStart },
        ...(weekDay !== undefined && {
          weekDay: { $eq: parseInt(weekDay as string, 10) },
        }),
      };

      console.log('Debug: applied filters =', JSON.stringify(ctx.query.filters));

      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);
