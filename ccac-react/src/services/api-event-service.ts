import { IEvent, IOrganizationEvents } from "../models/event";
import { useFetch } from "../utils/useFetch";
import { baseUrl } from "./api-product-service";

export function useGetAllEvents() {
    return useFetch<IOrganizationEvents>(baseUrl + "/event", {})
}

export function useCreateEvent(event: IEvent) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    }
    return useFetch(baseUrl + "/event", options)
}
