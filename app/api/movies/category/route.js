import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "movie"; // "movie" or "tv"
    const category = searchParams.get("category") || "popular";
    const page = searchParams.get("page") || 1;

    try {
        let data;
        if (type === "tv") {
            data = await tmdbService.getTvShowsByCategory(category, page);
        } else {
            data = await tmdbService.getMoviesByCategory(category, page);
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(`Error en GetMoviesByCategory (${category}): `, error.message);
        return NextResponse.json({
            error: `Error al obtener películas de la categoría ${category}`,
            detalle: error.message,
        }, { status: 500 });
    }
}

