import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Service from '../../../models/Service';

const MOCK_SERVICES = [
    {
        _id: 'mock1',
        name: 'Arba Minch Hospital',
        category: 'Clinic',
        phone: '046-881-1234',
        location: {
            lat: 6.0206,
            lng: 37.5641,
            address: 'Main Road, Arba Minch',
        },
        description: 'General hospital providing various medical services.',
        openingHours: '24/7',
    },
    {
        _id: 'mock2',
        name: 'City Mechanics',
        category: 'Mechanic',
        phone: '091-123-4567',
        location: {
            lat: 6.0250,
            lng: 37.5580,
            address: 'Industrial Zone, Arba Minch',
        },
        description: 'Expert car repair and maintenance services.',
        openingHours: '8:00 AM - 6:00 PM',
    },
];

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const query: Record<string, unknown> = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const services = await Service.find(query);
        return NextResponse.json({ success: true, data: services });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Database error, returning mock data:', errorMessage);
        return NextResponse.json({ success: true, data: MOCK_SERVICES, note: 'Showing mock data due to DB connection issue' });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const service = await Service.create(body);
        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
    }
}
