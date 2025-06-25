/**
 * restaurant controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::restaurant.restaurant', ({ strapi }) => ({
  async find(ctx) {
    const query = ctx.query as any;

    if (!query.filters) {
      query.filters = {};
    }

    const rawCodeCity = query.codeCity || query.filters?.codeCity?.$eq;

    if (rawCodeCity) {
      query.filters.codeCity = {
        $eq: Number(rawCodeCity),
      };
    }

    const entities = await strapi.entityService.findMany('api::restaurant.restaurant', {
      ...query,
      populate: '*',
    });

    return entities;
  }
}));
