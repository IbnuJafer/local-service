import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this service.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    category: {
        type: String,
        required: [true, 'Please specify the category of this service.'],
        enum: ['Clinic', 'Mechanic', 'Pharmacy', 'Tutor', 'Other'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description.'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a contact number.'],
    },
    location: {
        lat: {
            type: Number,
            required: [true, 'Latitude is required.'],
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required.'],
        },
        address: {
            type: String,
            required: [true, 'Please provide an address.'],
        },
    },
    openingHours: {
        type: String,
        default: '9:00 AM - 5:00 PM',
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150', // Replace with a default image or upload logic
    },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
