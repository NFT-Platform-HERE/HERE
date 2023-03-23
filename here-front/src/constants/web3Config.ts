import { create } from "ipfs-http-client";
import { IPFS_SERVER_URL } from "../utils/urls";

export const ipfs = create({ url: IPFS_SERVER_URL });

// export const ipfs = create({ url: process.env.NEXT_PUBLIC_IPFS_SERVER_URL });
