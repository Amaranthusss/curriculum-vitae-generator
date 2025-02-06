import type Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translations";
    resources: typeof Resources;
  }
}
