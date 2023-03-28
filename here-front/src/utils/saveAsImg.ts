import html2canvas from "html2canvas";

export const saveNFTImage = (id: string) => {
  const captureSection = document.querySelector(id) as HTMLElement;
  html2canvas(captureSection).then((canvas) => {
    saveAsImg(canvas.toDataURL("image/jpge", 1.0), "blood_donation_nft.jpg");
  });
};

const saveAsImg = (uri: string, filename: string) => {
  const link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};
