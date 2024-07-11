const Logger = {
    log: (s: any) => {
        console.log('\u001b[1;32m[SecureEduRest] [LOG]\u001b[0m', s);
    },
    info: (s: any) => {
        console.log('\u001b[1;34m[SecureEduRest] [INFO]\u001b[0m', s);
    },
    error: (s: any) => {
        console.log('\u001b[1;31m[SecureEduRest] [ERROR]\u001b[0m', s);
    },
    warn: (s: any) => {
        console.log('\u001b[1;33m[SecureEduRest] [WARN]\u001b[0m', s);
    }
}

export {Logger};