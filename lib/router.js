var handlers = require('./handlers')
var router = {}
router.routes = {
    'user':handlers.user,
    'notFound': handlers.notFound,
    'login':handlers.login,
    'logout':handlers.logout,
    'cart':handlers.cart,
    'order':handlers.order
};

module.exports = router;