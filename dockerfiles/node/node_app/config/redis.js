module.exports = {

    // Redis session settings
    session: {
        host: "redis",
        port: 6379,
        ttl: 86400 // 1 day
    },
    secret: "tell-no-one-and-you-may-live1",
    secure_cookie: false,
};
