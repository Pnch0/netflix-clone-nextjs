import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from "@/Services/supabase.js";

export async function POST(request) {
    try {
        const body = await request.json();
        const { correo, contraseña } = body;

        if (!correo || !contraseña) {
            return NextResponse.json({ error: "El correo y la contraseña son obligatorios." }, { status: 400 });
        }

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: correo,
            password: contraseña,
        });

        if (authError) {
            console.error("Detalle error Supabase Auth: ", authError.message, authError.status);
            return NextResponse.json({
                error: "Credenciales invalidas",
                detalle: authError.message
            }, { status: 401 });
        }

        const userId = authData.user?.id;

        const { data: usuarioPerfil, error: dbError } = await supabaseAdmin
            .from('Usuarios')
            .select(`
                id_usuario,
                nombre,
                apellido,
                correo,
                avatar_id
            `)
            .eq('id_usuario', userId)
            .single();

        if (dbError) {
            console.error("Error al consultar la tabla Usuarios: ", dbError.message);
        }

        return NextResponse.json({
            message: "Inicio de sesión exitoso",
            token: authData.session?.access_token,
            refresh_token: authData.session?.refresh_token,
            user: usuarioPerfil || {
                id_usuario: authData.user.id,
                correo: authData.user.email,
            }
        }, { status: 200 });
            
    } catch (error) {
        console.error("Error en LoginUser: ", error);
        return NextResponse.json({ error: "Error interno del servidor al intentar iniciar sesión." }, { status: 500 });
    }
}

