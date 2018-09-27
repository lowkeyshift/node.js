// Demo app configuration settings

// Private settings, in case we really need to do something here.
var mongo_connected = false;

module.exports = {
    // Yelp Settings when we get them
    // API-Key: "Key"
    // APP-Key: "Key"

    // Demo Settings
    app: "demo-app",
    port: 3000,
    host: '0.0.0.0',
    app_url: "yelp.demo.com",
    app_transport: "https",
    secret: "tell-no-one-and-you-may-live1",
    secure_cookie: false,

    // Mongo Settings
    mongo_host: '172.19.0.4',
    mongo_port: 27017,
    mongo_db: 'demo-mongo',
    mongo_set_connected: function(connected){
        mongo_connected = connected;
    },
    mongo_is_connected: function(){
        return mongo_connected;
    },

    // Redis session settings
    session: {
        host: "172.19.0.3",
        port: 6379,
        ttl: 86400 // 1 day
    },
}
