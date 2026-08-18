export function localizedString(value: any): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const currentLang = (window as any).salla?.lang?.getLocale?.() || "ar";
    return value[currentLang] || value["ar"] || value["en"] || "";
  }
  return "";
}
