import useSWR from 'swr';

import {baseUrl} from "./api-product-service";
import axios from "axios";
import {IGallery} from "../models/gallery";

export function useGetGallery() {
    const fetcher = (url: string) => axios.get<IGallery>(url, { withCredentials: true })
    return useSWR(baseUrl + '/gallery', fetcher);
}
