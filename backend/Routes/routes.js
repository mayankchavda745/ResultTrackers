const { Router } = require('express');
const router = Router();
let students = require('./data');

router.get('/students', (req, res) => {
    try {
        const { searchByName, sortByTotal, searchById } = req.query;
        let ans;
        if (sortByTotal && searchByName) {
            ans = students.filter(d => d.name.includes(searchByName));
            if (sortByTotal === 'asc')
                ans = ans.sort((a, b) => a.totalmark - b.totalmark);
            else
                ans = ans.sort((a, b) => b.totalmark - a.totalmark);
        } else if (sortByTotal) {
            if (sortByTotal === 'asc')
                ans = ans.sort((a, b) => a.totalmark - b.totalmark);
            else
                ans = ans.sort((a, b) => b.totalmark - a.totalmark);
        } else if (searchByName) {
            ans = students.filter(d=>d.name.includes(searchByName));
        } else if (searchById) {
            ans = students.find(d=>d.id);
        } else {
            ans=students;
        }
        res.status(200).send(ans);
    } catch (error) {
        res.status(400).send('Bad Request');
    }
});

router.get('/insights', async (req, res) => {
    const highScorer = students.filter(d => d.totalmark >= 201 && d.totalmark <= 300).length;
    const midScorer = students.filter(d => d.totalmark >= 101 && d.totalmark <= 200).length;
    const lowScorer = students.filter(d => d.totalmark >= 0 && d.totalmark <= 100).length;
    const subject1_100 = students.filter(d => d.subject1 === 100);
    const subject2_100 = students.filter(d => d.subject2 === 100);
    const subject3_100 = students.filter(d => d.subject3 === 100);
    const highestMark = students.sort((a, b) => b.totalmark - a.totalmark)[0].totalmark;
    const topScorrer = students.filter(d => d.totalmark === highestMark);
    res.status(200).send({
        highScorer, midScorer, lowScorer, subject1_100, subject2_100, subject3_100, topScorrer
    });
});

router.post('/students', (req, res) => {
    try {
        const { name, subject1, subject2, subject3, totalmark } = req.body;
        if (name.length >= 3 && subject1 >= 0 && subject1 <= 100 &&
            subject2 >= 0 && subject2 <= 100 && subject3 >= 0 && subject3 <= 100
            && totalmark === subject1 + subject2 + subject3) {
            students.push({
                id: students.length + 1,
                name, subject1, subject2, subject3, totalmark
            });
        } else if (name.length < 3) {
            throw ({ message: 'Invalid name' });
        } else if (totalmark !== subject1 + subject2 + subject3) {
            throw ({ message: 'Invalid totalMark' });
        }
        res.status(200).send(`posted successfullly`);
    } catch (error) {
        res.status(400).send({ Type: 'Bad Request', message: error.message });
    }
});

module.exports = router;