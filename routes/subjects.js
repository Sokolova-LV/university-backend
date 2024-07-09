const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const getSubject = require('../middlewares/getSubject');

router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

router.get('/:id', getSubject, (req, res) => {
    res.json(res.subject);
});

router.post('/', async (req, res) => {
    const subject = new Subject({
        name: req.body.name,
        lecture_hours: req.body.lecture_hours,
        practical_hours: req.body.practical_hours,
    });

    try {
        const newSubject = await subject.save();
        res.status(201).json({ message: `${newSubject} успішно додано до списку дисциплін` }); 
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.patch('/:id', getSubject, async (req, res) => {
    if (req.body.name !== null) {
        res.subject.name = req.body.name;
    }
    if (req.body.lecture_hours !== null) {
        res.subject.lecture_hours = req.body.lecture_hours;
    }
    if (req.body.practical_hours !== null) {
        res.subject.practical_hours = req.body.practical_hours;
    }

    try {
        const updatedSubject = await res.subject.save();
        res.json({ updatedSubject, message: 'Дані успішно оновлено' });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.delete('/:id', getSubject, async (req, res) => {
    try {
        await res.subject.remove();
        res.json({ message: 'Дисципліну успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

module.exports = router;