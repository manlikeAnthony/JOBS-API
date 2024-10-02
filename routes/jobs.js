const express = require('express');
const router = express.Router();
const {
    dashboard,
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob

} = require('../controllers/jobs')

router.get('/dashboard', dashboard)
router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router
