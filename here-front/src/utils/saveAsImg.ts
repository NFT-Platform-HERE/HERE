import * as htmlToImage from "html-to-image";

export const saveNFTImage = (id: string) => {
  let width;
  let height;

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

  htmlToImage
    .toPng(node, { canvasWidth: width, canvasHeight: height, cacheBust: true })
    .then((dataUrl) => {
      const link = window.document.createElement("a");
      link.download = "blood_donation.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => console.log(err));
};
