// src/api/promotion/controllers/promotion.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::promotion.promotion',
  ({ strapi }) => ({
    async find(ctx) {
      const { weekDay } = ctx.query;

      if (weekDay !== undefined) {
        // Coerce ctx.query.filters into an object (or empty)
        const existingFilters = (ctx.query.filters as Record<string, any>) || {};

        // Re‐assign filters to include our weekDay constraint
        ctx.query.filters = {
          ...existingFilters,
          weekDay: {
            $eq: parseInt(weekDay as string, 10),
          },
        };
      }

      // Now call the default finder, which will honor our filters
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
  })
);
