module.exports = (app) => {
    const complaints = require('../controllers/complaint.controller.js');

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

    // group complaints locales by companies
    app.get('/complaints/locale/:name', complaints.groupLocaleByCompany);

    // calculates the distance between two complaints
    app.get('/complaints/distance/:id1/:id2', complaints.calculateDistance);
}