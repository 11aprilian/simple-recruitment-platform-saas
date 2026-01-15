const router = require('express').Router()
const controller = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')
const rbac = require('../middlewares/rbac.middleware')

// rbac admin only
router.post('/', auth, rbac(['ADMIN']), controller.create)
router.get('/', auth, rbac(['ADMIN']), controller.findAll)
router.get('/:id', auth, rbac(['ADMIN']), controller.findOne)
router.delete('/:id', auth, rbac(['ADMIN']), controller.remove)

module.exports = router
