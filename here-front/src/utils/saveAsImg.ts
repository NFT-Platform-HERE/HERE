import * as htmlToImage from "html-to-image";
import { useCallback } from "react";

export const useSaveNFTImage = (id: string) => {
  let width: number;
  let height: number;

  const node = document.getElementById(id);

  if (node === null) {
    return;
  }
  if (id === "front-capture") {
    width = 500;
    height = 809;
  } else if (id === "back-capture") {
    width = 566;
    height = 350;
  }
  useCallback(() => {
    htmlToImage
      .toPng(node, { canvasWidth: width, canvasHeight: height })
      .then((dataUrl) => {
        const link = window.document.createElement("a");
        link.download = "blood_donation.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  }, [node]);
};
