import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") || 1;

    if (!query || query.trim() === "") {
        return NextResponse.json({ error: "Debes ingresar un término de búsqueda." }, { status: 400 });
    }

    try {
        const data = await tmdbService.searchMulti(query, page);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error en SearchMulti: ", error.message);
        return NextResponse.json({
            error: "Error en la búsqueda",
            detalle: error.message,
        }, { status: 500 });
    }
}

