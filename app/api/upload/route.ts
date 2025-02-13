import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    // Generate unique filename with UUID
    const fileExt = file.name.split(".").pop();
    const uniqueFileName = `image_${uuidv4()}.${fileExt}`;

    // Upload to storage
    const { data, error } = await supabase.storage
      .from("media")
      .upload(`uploads/${uniqueFileName}`, file);

    if (error) throw error;

    // Insert record into media table
    const { data: insertData, error: insertError } = await supabase
      .from("media")
      .insert([
        {
          name: uniqueFileName,
          path: data.path,
        },
      ]);

    if (insertError) throw insertError;

    return NextResponse.json({
      message: "File uploaded successfully",
      data: insertData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
