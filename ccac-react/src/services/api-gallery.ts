import useSWR from 'swr';

import axios from "axios";
import { IGallery } from "../models/gallery";
import { baseUrl } from "./api-product-service";

export function useGetGallery() {
    const fetcher = (url: string) => axios.get<IGallery>(url, { withCredentials: true })
    return useSWR(baseUrl + '/gallery', fetcher);
}
