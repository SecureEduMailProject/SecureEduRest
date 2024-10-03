module.exports = {
    apps: [
        {
            name: 'secureedurest',
            script: 'src/SecureEduRest.ts',
            interpreter: 'ts-node',  // Use ts-node to run TypeScript files directly
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
