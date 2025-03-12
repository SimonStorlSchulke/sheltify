'use strict';

/**
 * dogs-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dogs-page.dogs-page');
