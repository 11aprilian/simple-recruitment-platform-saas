const router = require('express').Router()
const controller = require('../controllers/applicant.controller')
const auth = require('../middlewares/auth.middleware')
const rbac = require('../middlewares/rbac.middleware')

// public
router.post('/', controller.apply)

// private
router.get('/', auth, rbac(['ADMIN', 'RECRUITER']), controller.findAll)
router.get('/:id', auth, rbac(['ADMIN', 'RECRUITER']), controller.findOne)
router.patch(
  '/:id/status',
  auth,
  rbac(['ADMIN', 'RECRUITER']),
  controller.updateStatus
)
router.patch(
  '/:id/notes',
  auth,
  rbac(['ADMIN', 'RECRUITER']),
  controller.updateNotes
)
router.delete(
  '/:id',
  auth,
  rbac(['ADMIN', 'RECRUITER']),
  controller.remove
)

module.exports = router
