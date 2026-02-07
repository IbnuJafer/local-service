import Link from 'next/link';
import { Phone, Clock, MapPin } from 'lucide-react';

interface ServiceCardProps {
    id: string;
    name: string;
    category: string;
    phone: string;
    address: string;
    openingHours: string;
    description: string;
}

export default function ServiceCard({ id, name, category, phone, address, openingHours, description }: ServiceCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">{category}</span>
                </div>
            </div>

            <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>

            <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    {phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {address}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {openingHours}
                </div>
            </div>

            <Link href={`/services/${id}`} className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Details
            </Link>
        </div>
    );
}
