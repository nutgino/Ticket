import { NextResponse } from "next/server";
import { supabase } from '@/lib/supabaseClient';

export async function GET(req){
    let { data: movies, error } = await supabase.from('movies').select('*')

    return NextResponse.json(movies);
}
