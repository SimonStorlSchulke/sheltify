'use strict';

/**
 * convey service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::convey.convey');
