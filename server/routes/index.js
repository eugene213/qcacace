// Libraries
const { Router, response } = require('express');

// Variables
const query = require('../queries');
const router = Router();

router.post('/login', (req, res) => { query.login(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/logout', (req, res) => { query.logout(req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.get('/profile/:id', (req, res) => { query.profile(req.params.id).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.get('/dashboard/:table', (req, res) => { query.dashboard(req.params.table).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
router.post('/list/:table', (req, res) => { query.list(req.params.table, req.body).then(response => res.status(200).send(response)).catch(error => res.status(200).send(error)); });
// router.post('/authentication/:type', (req, res) => { query.authentication(req.body, req.params.type).then(response => { res.status(200).send(response);  }).catch(error => res.status(200).send(error)); });
// router.get('/profile/:table/:query', (req, res) => { query.profile(req.params.table, req.params.query).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.post('/scan/:table', (req, res) => { query.scan(req.params.table, req.body).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.post('/dropdown/:table', (req, res) => { query.dropdown(req.params.table, req.body).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.get('/list/:table/:query', (req, res) => { query.list(req.params.table, req.params.query).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.get('/:table/:type/:query', (req, res) => { query.get(req.params.table, req.params.type, req.params.query).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.post('/:table/:type', (req, res) => { query.save(req.params.table, req.params.type, req.body).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });
// router.post('/:table/:type/:query', (req, res) => { query.update(req.params.table, req.params.type, req.params.query, req.body).then(response => { res.status(200).send(response); }).catch(error => res.status(200).send(error)); });

module.exports = router;