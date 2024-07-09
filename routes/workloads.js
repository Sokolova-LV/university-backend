const express = require('express');
const router = express.Router();
const Workload = require('../models/Workload');
const getWorkload = require('../middlewares/getWorkload');

router.get('/', async (req, res) => {
    try {
        const workloads = await Workload.find();
        res.json(workloads);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

router.get('/:id', getWorkload, (req, res) => {
    res.json(res.workload);
});

router.post('/', async (req, res) => {
    const workload = new Workload({
        lecturer_id: req.body.lecturer_id,
        subject_id: req.body.subject_id,
        group_number: req.body.group_number,
        type: req.body.type,
        year: req.body.year,
    });

    try {
        const newWorkload = await workload.save();
        res.status(201).json({ message: `${newWorkload} успішно додану до розкладу` });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.patch(':id', getWorkload, async (req, res) => {
    if (req.body.lecturer_id !== null) {
        res.workload.lecturer_id = req.body.lecturer_id;
    }
    if (req.body.subject_id !== null) {
        res.workload.subject_id = req.body.subject_id;
    }
    if (req.body.group_number !== null) {
        res.workload.group_number = req.body.group_number;
    }
    if (req.body.type !== null) {
        res.workload.type = req.body.type;
    }
    if (req.body.year !== null) {
        res.workload.year = req.body.year;
    }

    try {
        const updatedWorkload = await res.workload.save();
        res.json({ updatedWorkload, message: 'Дані успішно оновлено' });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong...' });
    }
});

router.delete('/:id', getWorkload, async (req, res) => {
    try {
        await res.workload.remove();
        res.json({ message: 'Заняття успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
});

module.exports = router;