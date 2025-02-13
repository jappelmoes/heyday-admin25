import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from("media")
      .upload(`uploads/${file.name}`, file);

    if (error) throw error;

    // Insert record into media table
    const { data: insertData, error: insertError } = await supabase
      .from("media")
      .insert([{ 
        name: file.name, 
        path: data.path 
      }]);

    if (insertError) throw insertError;

    return NextResponse.json({ 
      message: "File uploaded successfully", 
      data: insertData 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
}