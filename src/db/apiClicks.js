import supabase from "@/db/supabase.js";

export async function getClicksForUrls(urlIds) {
    const {data, error} = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlIds);

    if (error) {
        console.error("Error fetching clicks:", error);
        throw new Error("Unable to fetch clicks");
    }

    return data;
}