const Complaint = require('../models/complaint.model.js');
const cities = require('all-the-cities');
var Distance = require('geo-distance');

// Create and Save a new Complaint
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Complaint description can not be empty"
        });
    }

    var locale = cities.filter(city => {
        return city.name.match(req.body.locale)
    });

    if (locale.length === 0) {
        return res.status(400).send({
            message: "Complaint locale must be a valid city"
        });
    }

    // Create a Complaint
    const complaint = new Complaint({
        title: req.body.title || "Untitled Complaint",
        description: req.body.description,
        locale: req.body.locale,
        company: req.body.company
    });

    // Save Complaint in the database
    complaint.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Complaint."
            });
        });
};

// Retrieve and return all complaints from the database.
exports.findAll = (req, res) => {
    Complaint.find()
        .then(complaints => {
            res.send(complaints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving complaints."
            });
        });
};

// Find a single complaint with an id
exports.findOne = (req, res) => {
    Complaint.findById(req.params.id)
        .then(complaint => {
            if (!complaint) {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            res.send(complaint);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving complaint with id " + req.params.id
            });
        });
};

// Update a complaint identified by the Id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Complaint description can not be empty"
        });
    }

    // Find complaint and update it with the request body
    Complaint.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Complaint",
        description: req.body.description,
        locale: req.body.locale,
        company: req.body.company
    }, { new: true })
        .then(complaint => {
            if (!complaint) {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            res.send(complaint);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating complaint with id " + req.params.id
            });
        });
};

// Delete a complaint with the specified id in the request
exports.delete = (req, res) => {
    Complaint.findByIdAndRemove(req.params.id)
        .then(complaint => {
            if (!complaint) {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            res.send({ message: "Complaint deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete complaint with id " + req.params.id
            });
        });
};

// Group locales by company
exports.groupLocaleByCompany = (req, res) => {
    Complaint.aggregate([
        { "$group": { _id: "$company", count: { $sum: 1 } } }
    ])
        .then(complaints => {
            res.send(complaints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving complaints."
            });
        });
};

// Calculates the distance between the locales of two complaints
exports.calculateDistance = (req, res) => {
    Complaint.findById(req.params.id1)
        .then(complaint1 => {
            if (!complaint1) {
                return res.status(404).send({
                    message: "Complaint 1 not found with id " + req.params.id1
                });
            }
            Complaint.findById(req.params.id2)
                .then(complaint2 => {
                    if (!complaint2) {
                        return res.status(404).send({
                            message: "Complaint 2 not found with id " + req.params.id2
                        });
                    }
                    var locale1 = cities.filter(city => {
                        return city.name === complaint1.locale;
                    });
                    var locale2 = cities.filter(city => {
                        return city.name === complaint2.locale;
                    });

                    var city1 = null
                    var city2 = null;

                    var max_pop_locale1 = 0;

                    for (let i = 0; i < locale1.length; i++) {
                        if (locale1[i].population > max_pop_locale1) {
                            city1 = {
                                lat: locale1[i].lat,
                                lon: locale1[i].lon
                            };
                            max_pop_locale1 = locale1[i].population;
                        }
                    }

                    var max_pop_locale2 = 0;

                    for (let i = 0; i < locale2.length; i++) {
                        if (locale2[i].population > max_pop_locale2) {
                            city2 = {
                                lat: locale2[i].lat,
                                lon: locale2[i].lon
                            };
                            max_pop_locale2 = locale2[i].population;
                        }
                    }

                    var distance = Distance.between(city1, city2);
                    res.send(distance.human_readable());
                });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Complaint not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving complaint with id " + req.params.id
            });
        });
};
