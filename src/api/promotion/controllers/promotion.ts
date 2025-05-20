import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::promotion.promotion',
  ({ strapi }) => ({
    async find(ctx) {
      const { weekDay, savedIds } = ctx.query;
      const existingFilters = (ctx.query.filters as Record<string, any>) || {};

      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).toISOString();

      ctx.query.filters = {
        ...existingFilters,
        expirationDate: { $gte: todayStart },
        ...(weekDay !== undefined && {
          weekDay: { $eq: parseInt(weekDay as string, 10) },
        }),
        ...(savedIds !== undefined && {
          id: {
            $in: (savedIds as string)
              .split(',')
              .map((s) => parseInt(s, 10))
              .filter((n) => !isNaN(n)),
          },
        }),
      };

      // ✅ Populate restaurant.documentId only if not already set
      ctx.query.populate ??= {
        restaurant: {
          fields: ['documentId'],
        },
      };

      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);
