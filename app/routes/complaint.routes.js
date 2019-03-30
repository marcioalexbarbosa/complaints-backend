module.exports = (app) => {
    const complaints = require('../controllers/complaints.controller.js');

    // Create a new Complaint
    app.post('/complaints', complaints.create);

    // Retrieve all Complaints
    app.get('/complaints', complaints.findAll);

    // Retrieve a single Complaint with id
    app.get('/complaints/:id', complaints.findOne);

    // Update a Complaint with id
    app.put('/complaints/:id', complaints.update);

    // Delete a Complaint with id
    app.delete('/complaints/:id', complaints.delete);

    app.get('/complaints/locale/:name', complaints.findByLocale);
}