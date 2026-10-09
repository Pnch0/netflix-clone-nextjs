import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") || "all";
    const timeWindow = searchParams.get("timeWindow") || "week";

    try {
        const data = await tmdbService.getTrending(mediaType, timeWindow);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error en GetTrending: ", error.message);
        return NextResponse.json({
            error: "Error al obtener las tendencias",
            detalle: error.message,
        }, { status: 500 });
    }
}

