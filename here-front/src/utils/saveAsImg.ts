import * as htmlToImage from "html-to-image";
import { useCallback } from "react";

export const saveNFTImage = (id: string) => {
  let width;
  let height;

  const node = document.getElementById(id);

  if (node === null) {
    console.log("?>?>?");
    return;
  }
  if (id === "front-capture") {
    width = 500;
    height = 809;
  } else if (id === "back-capture") {
    width = 566;
    height = 350;
  }

  console.log(node);
  console.log(width, height);

  htmlToImage
    .toPng(node, { canvasWidth: width, canvasHeight: height })
    .then((dataUrl) => {
      const link = window.document.createElement("a");
      link.download = "blood_donation.png";
      link.href = dataUrl;
      link.click();
      console.log(dataUrl);
    })
    .catch((err) => console.log(err, node));
};
