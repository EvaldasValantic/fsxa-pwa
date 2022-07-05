import serverless from 'serverless-http';
import { Nuxt } from 'nuxt-start';
import { builder } from '@netlify/functions';
import config from '../../nuxt.config.ts';

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
