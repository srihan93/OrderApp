var handlers = require('./handlers')
var router = {}
router.routes = {
    'user':handlers.user,
    'notFound': handlers.notFound
};

module.exports = router;