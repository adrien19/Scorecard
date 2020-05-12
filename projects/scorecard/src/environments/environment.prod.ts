import { APP_ENVIRONMENTS } from './env.configs';

export const environment = {
  production: true,
  databaseUrl: APP_ENVIRONMENTS.databaseUrl,
  databaseApiKey: APP_ENVIRONMENTS.databaseApiKey,
};
