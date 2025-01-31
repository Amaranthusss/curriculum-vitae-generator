import type { TableCell } from "pdfmake/interfaces";

export const page = {
  a4Height: 835.89,
};

export const layout = {
  drawerWidth: 144,
  imageWidth: 144,
  imageTopMargin: 2,
  imageBottomMargin: 18,
};

export const color = {
  secondary: "#e1e2e3",
  white: "#ffffff",
};

export const padding = {
  top: 20,
  inline: 30,
  block: 4,
};

export const sidebar = {
  bgColor: "#1c1c1c",
  caption: {
    fontSize: 10,
    marginInline: 2,
    marginBottom: 4,
    tagWidth: 16,
  },
  tag: {
    fontSize: 10,
    marginBottom: 8,
  },
};

export const caption = {
  fontSize: 14,
  characterSpacing: 3,
  bold: true,
  style: [{ fontFeatures: ["c2sc", "smcp"] }],
  border: [false, false, false, true],
};

export const paragraph = {
  fontSize: 10,
  alignment: "justify",
  marginTop: 1,
  marginBottom: 1,
} satisfies TableCell;

export const splitter = {
  border: [false, false, false, true],
};
