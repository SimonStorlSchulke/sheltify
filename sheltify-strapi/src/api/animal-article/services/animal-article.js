'use strict';

/**
 * animal-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::animal-article.animal-article');
