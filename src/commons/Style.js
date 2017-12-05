import { CSSProperties } from "react";

export function classList(...classNames) {
    if (classNames && classNames.length > 0) {
        return classNames.filter((c) => !!c).join(" ") || undefined;
    }
}
