'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

export default function MapProvider({ children }: { children: React.ReactNode }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const isKeyValid = apiKey.length > 10 && apiKey !== 'your_google_maps_api_key_here';

    console.log('Google Maps API Key check:', isKeyValid ? 'Valid format' : 'Invalid/Missing - Using Mock Map');

    if (!isKeyValid) {
        return <>{children}</>;
    }

    return (
        <APIProvider apiKey={apiKey}>
            {children}
        </APIProvider>
    );
}
