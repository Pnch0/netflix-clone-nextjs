import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") || "movie";

    try {
        const genres = await tmdbService.getGenres(mediaType);
        return NextResponse.json(genres, { status: 200 });
    } catch (error) {
        console.error(`Error en GetGenres (${mediaType}): `, error.message);
        return NextResponse.json({
            error: "Error al obtener la lista de géneros",
            detalle: error.message,
        }, { status: 500 });
    }
}

