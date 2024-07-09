const Lecturer = require('../models/Lecturer');

async function getLecturer(req, res, next) {
    let lecturer;
    try {
        lecturer = await Lecturer.findById(req.params.id);
        if (lecturer === null) {
            return res.status(404).json({ message: 'Даного викладача не знайдено' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong...' });
    }

    res.lecturer = lecturer;
    next();
}

module.exports = getLecturer;