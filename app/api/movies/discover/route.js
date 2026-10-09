import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") || "movie";
    const genreId = searchParams.get("genreId");
    const page = searchParams.get("page") || 1;

    if (!genreId) {
        return NextResponse.json({ error: "El ID del género es obligatorio." }, { status: 400 });
    }

    try {
        const data = await tmdbService.discoverByGenre(mediaType, genreId, page);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(`Error en DiscoverByGenre (${mediaType} / ${genreId}): `, error.message);
        return NextResponse.json({
            error: "Error al filtrar por género",
            detalle: error.message,
        }, { status: 500 });
    }
}

