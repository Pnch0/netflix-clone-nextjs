import { NextResponse } from 'next/server';
import { supabaseAdmin } from "@/Services/supabase.js";

export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, apellido, correo, contraseña, avatar_id } = body;

        if (!nombre || !apellido || !correo || !contraseña) {
            return NextResponse.json({ error: "Nombre, apellido, correo y contraseña son obligatorios." }, { status: 400 });
        }

        let userId = null;
        
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: correo,
            password: contraseña,
            email_confirm: true
        });

        if (authError) throw authError;

        userId = authData.user?.id;

        if (userId) {
            const { data, error: dbError } = await supabaseAdmin
                .from('Usuarios')
                .insert([
                    {
                        id_usuario: userId,
                        nombre,
                        apellido,
                        correo,
                        avatar_id: avatar_id || null
                    }
                ])
                .select();

            if (dbError) {
                console.error("Error de DB detectado: ", dbError);
                throw dbError;
            }

            return NextResponse.json({
                message: "Usuario creado con exito",
                usuario: data[0]
            }, { status: 201 });
        }
    } catch (error) {
        console.error("Error detectado en el proceso de registro: ", error.message);
        
        return NextResponse.json({
            error: "Hubo un problema al registrar al usuario",
            detalle: error.message
        }, { status: 500 });
    }
}

