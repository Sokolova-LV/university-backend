const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');
const getLecturer = require('../middlewares/getLecturer');

router.get('/', async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

router.get('/:id', getLecturer, (req, res) => {
    res.json(res.lecturer);
});

router.post('/', async (req, res) => {
    const lecturer = new Lecturer({
        name: req.body.name,
        degree: req.body.degree,
        position: req.body.position,
        experience: req.body.experience,
    });

    try {
        const newLecturer = await lecturer.save();
        res.status(201).json({ message: `${newLecturer} успішно додано до списку викладачів` });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.patch('/:id', getLecturer, async (req, res) => {
    if (req.body.name !== null) {
        res.lecturer.name = req.body.name;
    }
    if (req.body.degree !== null) {
        res.lecturer.degree = req.body.degree;
    }
    if (req.body.position !== null) {
        res.lecturer.position = req.body.position;
    }
    if (req.body.experience !== null) {
        res.lecturer.experience = req.body.experience;
    }

    try {
        const updatedLecturer = await res.lecturer.save();
        res.json({ updatedLecturer, message: 'Дані успішно оновлено' });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.delete('/:id', getLecturer, async (req, res) => {
    try {
        await res.lecturer.remove();
        res.json({ message: 'Викладача успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

module.exports = router;