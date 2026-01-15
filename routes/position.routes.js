const router = require('express').Router()
const controller = require('../controllers/position.controller')
const auth = require('../middlewares/auth.middleware')
const rbac = require('../middlewares/rbac.middleware')

router.post('/', auth, rbac(['ADMIN', 'RECRUITER']), controller.create)
router.get('/', auth, rbac(['ADMIN', 'RECRUITER']), controller.findAll)
router.get('/:id', auth, rbac(['ADMIN', 'RECRUITER']), controller.findOne)
router.put('/:id', auth, rbac(['ADMIN', 'RECRUITER']), controller.update)
router.delete('/:id', auth, rbac(['ADMIN', 'RECRUITER']), controller.remove)

module.exports = router
