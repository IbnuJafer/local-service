'use client';

import { useEffect, useState, useCallback } from 'react';
import ServiceForm from '@/components/ServiceForm';
import { Trash2 } from 'lucide-react';

interface Service {
    _id: string;
    name: string;
    category: string;
    location: { address: string };
}

export default function AdminPage() {
    const [services, setServices] = useState<Service[]>([]);

    const fetchServices = useCallback(async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            if (data.success) setServices(data.data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setServices(services.filter(s => s._id !== id));
        } else {
            alert('Failed to delete');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            <ServiceForm onServiceAdded={fetchServices} />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Manage Services ({services.length})</h2>
                <div className="space-y-4">
                    {services.map(service => (
                        <div key={service._id} className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
                            <div>
                                <h4 className="font-bold">{service.name}</h4>
                                <p className="text-sm text-gray-500">{service.category} - {service.location.address}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(service._id)}
                                className="text-red-500 hover:text-red-700 p-2"
                                title="Delete Service"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {services.length === 0 && <p className="text-gray-500">No services added yet.</p>}
                </div>
            </div>
        </div>
    );
}
