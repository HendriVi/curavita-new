export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

export function formatCHF(n: number | undefined) {
    if (typeof n !== "number" || Number.isNaN(n)) return "CHF –";
    return new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
        maximumFractionDigits: 0,
    }).format(n);
}
