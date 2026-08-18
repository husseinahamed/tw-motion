function c(n) {
  var t, r, o;
  if (typeof n == "string") return n;
  if (n && typeof n == "object") {
    const i = ((o = (r = (t = window.salla) == null ? void 0 : t.lang) == null ? void 0 : r.getLocale) == null ? void 0 : o.call(r)) || "ar";
    return n[i] || n.ar || n.en || "";
  }
  return "";
}
export {
  c as l
};
