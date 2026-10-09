import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;

    try {
        const data = await tmdbService.getKdramas(page);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error en getKdramas: ", error.message);
        return NextResponse.json({
            error: "Error al obtener los K-Dramas",
            detalle: error.message,
        }, { status: 500 });
    }
}

