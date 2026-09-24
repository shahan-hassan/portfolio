import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
