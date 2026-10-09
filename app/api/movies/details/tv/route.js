import { NextResponse } from 'next/server';
import { tmdbService } from '@/Services/tmdbService.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "El ID de la serie es obligatorio." }, { status: 400 });
    }

    try {
        const data = await tmdbService.getTvDetails(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(`Error en GetTvDetails (ID: ${id}): `, error.message);
        return NextResponse.json({
            error: "Error al obtener los detalles de la serie",
            detalle: error.message,
        }, { status: 500 });
    }
}

