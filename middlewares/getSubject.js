const Subject = require('../models/Subject');

async function getSubject(req, res, next) {
    let subject;
    try {
        subject = await Subject.findById(req.params.id);
        if (subject === null) {
            return res.status(404).json({ message: 'Дану дисципліну не знайдено' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong...' });
    }

    res.subject = subject;
    next();
}

module.exports = getSubject;