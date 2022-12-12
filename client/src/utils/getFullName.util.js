import { capitalize } from "@mui/material/utils";

export function getFullName(firstName, lastName, shortenLastName = true) {
  const first = firstName || "";
  const last = (shortenLastName ? lastName?.split("")?.[0] : lastName) || "";

  return `${capitalize(first)} ${capitalize(last)}`.trim() || "Guest";
}
