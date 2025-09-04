import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabaseClient';



export async function GET(req, { params }) {
    const { id } = await params;
    let { data: movie, error } = await supabase.from('movies').select('*').eq('id', id).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(movie);
}