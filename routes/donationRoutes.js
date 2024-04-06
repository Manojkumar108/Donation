// routes/donationRoutes.js
import express from 'express';
import donationController from '../controllers/donationController.js';

const router = express.Router();

// Route to create a new donation
router.post('/donation', donationController.createDonation);

// Route to get all donations
router.get('/donations', donationController.getAllDonations);

export default router;
