'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Map from '@/components/Map';
import { Phone, Clock, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

export default function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                // app/api/services/route.ts -> GET handles search/category.
                // app/api/services/[id]/route.ts -> PUT/DELETE/GET.
                const resBetter = await fetch(`/api/services/${id}`);
                const data = await resBetter.json();
                if (data.success) {
                    setService(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading service details...</div>;
    if (!service) return <div className="p-8 text-center">Service not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mt-2 font-medium">{service.category}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                                <div className="flex items-center text-gray-700">
                                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                                    <span className="font-semibold mr-2">Phone:</span>
                                    <a href={`tel:${service.phone}`} className="text-blue-600 hover:underline">{service.phone}</a>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                                    <span className="font-semibold mr-2">Hours:</span>
                                    <span>{service.openingHours}</span>
                                </div>
                                <div className="flex items-start text-gray-700">
                                    <MapPin className="w-5 h-5 mr-3 text-blue-600 mt-1" />
                                    <div>
                                        <span className="font-semibold block">Address:</span>
                                        <span>{service.location.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-3">About</h2>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>

                            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                                Book / Contact Now
                            </button>
                        </div>

                        <div className="h-[300px] md:h-auto min-h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                            {/* Pass single service to map but center on it */}
                            <Map
                                services={[{
                                    id: service._id,
                                    name: service.name,
                                    lat: service.location.lat,
                                    lng: service.location.lng,
                                    category: service.category
                                }]}
                                center={{ lat: service.location.lat, lng: service.location.lng }}
                                zoom={15}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
