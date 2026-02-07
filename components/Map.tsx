'use client';

import { Map as GoogleMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import MockMap from './MockMap';

interface ServiceLocation {
    id: string;
    name: string;
    lat: number;
    lng: number;
    category: string;
}

interface MapProps {
    services: ServiceLocation[];
    center?: { lat: number; lng: number };
    zoom?: number;
}

export default function Map({ services, center = { lat: 6.0206, lng: 37.5641 }, zoom = 13 }: MapProps) {
    const [activeService, setActiveService] = useState<string | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const isKeyValid = apiKey.length > 10 && apiKey !== 'your_google_maps_api_key_here';

    if (!isKeyValid) {
        return <MockMap
            center={center}
            zoom={zoom}
            markers={services.map(s => ({ id: s.id, lat: s.lat, lng: s.lng, title: s.name }))}
        />;
    }

    return (
        <div className="h-full w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <GoogleMap
                mapId="DEMO_MAP_ID"
                defaultCenter={center}
                defaultZoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                className="w-full h-full"
            >
                {services.map((service) => (
                    <AdvancedMarker
                        key={service.id}
                        position={{ lat: service.lat, lng: service.lng }}
                        onClick={() => setActiveService(service.id)}
                        title={service.name}
                    >
                        <Pin background={activeService === service.id ? '#2563eb' : '#ef4444'} borderColor={'#fff'} glyphColor={'#fff'} />
                    </AdvancedMarker>
                ))}
            </GoogleMap>
        </div>
    );
}
