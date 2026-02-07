'use client';

import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import Map from './Map';
import { Search, Filter } from 'lucide-react';

interface Service {
    _id: string;
    name: string;
    category: string;
    phone: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    openingHours: string;
    description: string;
}

export default function ServiceDashboard() {
    const [services, setServices] = useState<Service[]>([]);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                const data = await res.json();
                if (data.success) {
                    setServices(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const filterServices = () => {
            let filtered = services;

            if (selectedCategory !== 'All') {
                filtered = filtered.filter(service => service.category === selectedCategory);
            }

            if (searchTerm) {
                const lowerTerm = searchTerm.toLowerCase();
                filtered = filtered.filter(service =>
                    service.name.toLowerCase().includes(lowerTerm) ||
                    service.description.toLowerCase().includes(lowerTerm)
                );
            }

            setFilteredServices(filtered);
        };

        filterServices();
    }, [searchTerm, selectedCategory, services]);

    const categories = ['All', 'Clinic', 'Mechanic', 'Pharmacy', 'Tutor', 'Other'];

    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            {/* Search and Filter Bar */}
            <div className="bg-white p-4 shadow-sm rounded-lg mb-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
                {/* Service List */}
                <div className="w-full lg:w-1/3 overflow-y-auto pr-2 space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <ServiceCard
                                key={service._id}
                                id={service._id}
                                name={service.name}
                                category={service.category}
                                phone={service.phone}
                                address={service.location.address}
                                openingHours={service.openingHours}
                                description={service.description}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            No services found matching your criteria.
                        </div>
                    )}
                </div>

                {/* Map View */}
                <div className="hidden lg:block w-2/3 bg-gray-200 rounded-lg">
                    <Map
                        services={filteredServices.map(s => ({
                            id: s._id,
                            name: s.name,
                            lat: s.location.lat,
                            lng: s.location.lng,
                            category: s.category
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}
