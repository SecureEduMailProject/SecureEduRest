const generatedTokens: string[] = []
let idStart = 9999999999 + Date.now() + 100000000000

export const Random = {
    /**
     * Generate a random token
     *
     * @returns {string} The generated token
     */
    generateToken: (length?: number) : string => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + (length ? '' : '.');
        let token = '';
        for (let i = 0; i < (length ?? 128); i++)
            token += chars[Math.floor(Math.random() * chars.length)];
        if (generatedTokens.includes(token)) return Random.generateToken(length)
        generatedTokens.push(token)
        return token;
    },

    /**
     * Generate a random id
     *
     * @returns {string} The generated id
     */
    generateId: () => {
        idStart++
        return String(idStart)
    }
}