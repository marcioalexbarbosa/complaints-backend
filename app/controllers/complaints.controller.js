const Complaint = require('../models/complaint.model.js');

// Create and Save a new Complaint
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Complaint description can not be empty"
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
        console.log('data', data);
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
        if(!complaint) {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.id
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    if(!req.body.content) {
        return res.status(400).send({
            message: "Complaint content can not be empty"
        });
    }

    // Find complaint and update it with the request body
    Complaint.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Complaint",
        description: req.body.description,
        locale: req.body.locale,
        company: req.body.company
    }, {new: true})
    .then(complaint => {
        if(!complaint) {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.id
            });
        }
        res.send(complaint);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
        if(!complaint) {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.id
            });
        }
        res.send({message: "Complaint deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Complaint not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete complaint with id " + req.params.id
        });
    });
};
