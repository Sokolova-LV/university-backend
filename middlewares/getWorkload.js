const Workload = require('../models/Workload');

async function getWorkload(req, res, next) {
    let workload;
    try {
        workload = await Workload.findById(req.params.id);
        if (workload === null) {
            return res.status(404).json({ message: 'Дане заняття не знайдено' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }

    res.workload = workload;
    next();
}

module.exports = getWorkload;