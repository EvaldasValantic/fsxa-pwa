const serverless = require('serverless-http');
const { Nuxt } = require('nuxt-start');
const { builder } = require('@netlify/functions');
const config = require('../../nuxt.config');

function createNuxtHandler(nuxtConfig) {
  const nuxt = new Nuxt({
    ...nuxtConfig,
    dev: false,
    _start: true,
  });

  let server = null;
  return async (event, ctx) => {
    if (!server) {
      await nuxt?.ready();
      server = serverless(nuxt.server.app);
    }

    return await server(event, ctx);
  };
}

exports.handler = builder(createNuxtHandler(config));
