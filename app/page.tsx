import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function page() {
  const supabase = await createClient();
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
