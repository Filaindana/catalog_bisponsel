import { Facebook, Instagram, MessageSquare, Link } from "lucide-react";

export function getSocialIcon(key) {
  const name = String(key || "").toLowerCase();

  if (name.includes("instagram")) return Instagram;
  if (name.includes("facebook")) return Facebook;
  if (name.includes("whatsapp")) return MessageSquare;
  if (name.includes("tiktok")) return Link;
  return Link;
}
