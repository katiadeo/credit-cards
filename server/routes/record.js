const express = require('express');
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const recordRoutes = express.Router();

// get list of all records with ObjectId and amount field.
recordRoutes.route('/record').get(function (req, res) {
	let db_connect = dbo.getDb('cardsDatabase');
	db_connect
		.collection('records')
		.find({})
		.project({ amount: 1 })
		.toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
});

// ADD RECORD
recordRoutes.route('/record/add').post(function (req, response) {
	let db_connect = dbo.getDb();
	let obj = {
		number: req.body.number,
		name: req.body.name,
		expiry: req.body.expiry,
		cvc: req.body.cvc,
		amount: req.body.amount,
	};
	db_connect.collection('records').insertOne(obj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// DELETE RECORD
recordRoutes.route('/:id').delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection('records').deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		response.json(obj);
	});
});

module.exports = recordRoutes;
