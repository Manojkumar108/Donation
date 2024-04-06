// controllers/donationController.js
import Donation from '../models/Donation.js';

const donationController = {
    // Create a new donation
    createDonation: async (req, res) => {
        try {
            const { donorName, clothesType, donatedItems } = req.body;
            const newDonation = new Donation({
                donorName,
                clothesType,
                donatedItems
            });
            await newDonation.save();
            res.status(201).json({ message: 'Donation created successfully' });
        } catch (error) {
            console.error('Error creating donation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get all donations
    getAllDonations: async (req, res) => {
        try {
            const donations = await Donation.find();
            res.json(donations);
        } catch (error) {
            console.error('Error fetching donations:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    
};

export default donationController;
