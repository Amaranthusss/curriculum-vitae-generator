import _ from "lodash";

const compactWidth = 900;

export const isCompact = (): boolean => _.lte(window.innerWidth, compactWidth);
