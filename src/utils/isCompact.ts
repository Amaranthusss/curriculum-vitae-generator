import _ from "lodash";

const compactWidth = 800;

export const isCompact = (): boolean => _.lte(window.innerWidth, compactWidth);
