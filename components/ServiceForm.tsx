'use client';

import { useState } from 'react';

interface ServiceFormProps {
    onServiceAdded: () => void;
}

export default function ServiceForm({ onServiceAdded }: ServiceFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Clinic',
        phone: '',
        address: '',
        lat: '',
        lng: '',
        description: '',
        openingHours: '9:00 AM - 5:00 PM',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    location: {
                        lat: parseFloat(formData.lat),
                        lng: parseFloat(formData.lng),
                        address: formData.address,
                    },
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error?.message || 'Failed to add service');

            setFormData({
                name: '', category: 'Clinic', phone: '', address: '', lat: '', lng: '', description: '', openingHours: '9:00 AM - 5:00 PM'
            });
            onServiceAdded();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Service Name" required value={formData.name} onChange={handleChange} className="p-2 border rounded" />
                <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
                    <option>Clinic</option>
                    <option>Mechanic</option>
                    <option>Pharmacy</option>
                    <option>Tutor</option>
                    <option>Other</option>
                </select>
                <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="p-2 border rounded" />
                <input name="openingHours" placeholder="Opening Hours" value={formData.openingHours} onChange={handleChange} className="p-2 border rounded" />
            </div>

            <textarea name="description" placeholder="Description" required value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-24" />

            <div className="space-y-2">
                <p className="font-medium text-sm text-gray-700">Location</p>
                <input name="address" placeholder="Address / Landmark" required value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
                <div className="grid grid-cols-2 gap-4">
                    <input name="lat" type="number" step="any" placeholder="Latitude (e.g., 6.0206)" required value={formData.lat} onChange={handleChange} className="p-2 border rounded" />
                    <input name="lng" type="number" step="any" placeholder="Longitude (e.g., 37.5641)" required value={formData.lng} onChange={handleChange} className="p-2 border rounded" />
                </div>
                <p className="text-xs text-gray-500">Tip: Use Google Maps to find Lat/Lng.</p>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50">
                {loading ? 'Adding...' : 'Add Service'}
            </button>
        </form>
    );
}
