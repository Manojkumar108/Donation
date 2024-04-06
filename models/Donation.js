// models/donation.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true
    },
    clothesType: {
        type: String,
        enum: ['mens', 'womens', 'kids','toys','footware'],
        required: true
    },
    donatedItems: {
        type: String,
        required: true
    },
    donationDate: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
