import { endSaveImg } from "@/stores/myNFT/saveImg";
import * as htmlToImage from "html-to-image";

export const saveNFTImage = (id: string, dispatch: any) => {
  let width;
  let height;
  let node: any;

  if (node === null) {
    return;
  }

  if (id === "front-capture") {
    node = document.querySelectorAll(".camera");
    width = 500;
    height = 809;
    for (let i = 0; i < node.length; i++) {
      htmlToImage
        .toPng(node[i], {
          canvasWidth: width,
          canvasHeight: height,
          cacheBust: true,
        })
        .then((dataUrl) => {
          dispatch(endSaveImg());
          const link = window.document.createElement("a");
          link.download = "blood_donation.png";
          link.href = dataUrl;
          link.click();
        });
    }
  } else if (id === "back-capture") {
    node = document.getElementById("back-capture");
    width = 566;
    height = 350;
    htmlToImage
      .toPng(node, {
        canvasWidth: width,
        canvasHeight: height,
        cacheBust: true,
      })
      .then((dataUrl) => {
        dispatch(endSaveImg());
        const link = window.document.createElement("a");
        link.download = "blood_donation.png";
        link.href = dataUrl;
        link.click();
      });
  }
};
