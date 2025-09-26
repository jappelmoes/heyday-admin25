import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("content_items").select("id, name");
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        {data?.map((item) => (
          <Link key={item.id} href={`/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
