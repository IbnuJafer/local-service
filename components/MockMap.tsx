'use client';

interface MockMapProps {
    center: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{ id: string; lat: number; lng: number; title: string }>;
}

export default function MockMap({ center, zoom = 13, markers = [] }: MockMapProps) {
    return (
        <div className="w-full h-full bg-blue-50 relative overflow-hidden flex items-center justify-center border border-blue-100 rounded-lg">
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
            </div>

            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm z-10 max-w-xs">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Map (Mock Mode)</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Google Maps API Key is missing.
                    <br />
                    Showing static placeholder.
                </p>
                <div className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
                    Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
                </div>
            </div>

            {markers.map(marker => (
                <div
                    key={marker.id}
                    className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        // Simple projection for mock demo (not accurate)
                        // Just creating a scatter based on center relative diff
                        left: `calc(50% + ${(marker.lng - center.lng) * 5000}px)`,
                        top: `calc(50% - ${(marker.lat - center.lat) * 5000}px)`
                    }}
                    title={marker.title}
                />
            ))}
        </div>
    );
}
