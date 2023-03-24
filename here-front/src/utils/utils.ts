import { MetaInfo } from "./../types/MetaInfo";

export function randomFromZeroToN(N: number): number {
  return Math.floor(Math.random() * N);
}

export function makeJsonMetaData({
  name,
  gender,
  type,
  walletAddress,
  birth,
  createdDate,
  place,
  imageURL,
}: MetaInfo) {
  const metadata = {
    name,
    gender,
    type,
    walletAddress,
    birth,
    createdDate,
    place,
    imageURL,
  };

  console.log("metadata", metadata);

  const jsonData = JSON.stringify(metadata);

  return jsonData;
}