const dotenv = require('dotenv');

const envTypes = ['dev', 'test', 'prod'];

const env = {};

envTypes.forEach((type) => {
	const { parsed } = dotenv.config({ path: `./.env.${type}` });

	if (parsed) {
		env[type] = { ...parsed };
	}
});

module.exports = {
   apps: [
      {
         name: 'pef-frontend',
         script: 'node_modules/next/dist/bin/next',
         instances: 1,
         args: 'start',
          env_dev: {
            ...env['dev'],
         },
         env_test: {
            ...env['test'],
         },
         env_prod: {
            ...env['prod'],
         },
      },
   ],
};
