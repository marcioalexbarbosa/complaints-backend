const mongoose = require('mongoose');

const ComplaintSchema = mongoose.Schema({
    title: String,
    description: String,
    locale: String,
    company: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Complaint', ComplaintSchema);