export interface IOrganizationEvents {
    pagination: Pagination;
    events: IEvent[];
}

export interface Pagination {
    object_count: number;
    page_number: number;
    page_size: number;
    page_count: number;
    continuation: string;
    has_more_items: boolean;
}

export interface IEvent {
    id: string;
    name: Description;
    description: Description;
    start: End;
    end: End;
    url: string;
    vanity_url: string;
    created: Date;
    changed: Date;
    published: Date;
    status: string;
    currency: string;
    online_event: boolean;
    organization_id: string;
    organizer_id: string;
    organizer: Organizer;
    logo_id: null;
    logo: Logo;
    venue: Venue;
    format_id: null;
    format: Category;
    category: Category;
    subcategory: IEventSubCategory;
    music_properties: MusicProperties;
    bookmark_info: BookmarkInfo;
    ticket_availability: TicketAvailability;
    listed: boolean;
    shareable: boolean;
    invite_only: boolean;
    show_remaining: boolean;
    password: string;
    capacity: number;
    capacity_is_custom: boolean;
    tx_time_limit: string;
    hide_start_date: boolean;
    hide_end_date: boolean;
    locale: string;
    is_locked: boolean;
    privacy_setting: string;
    is_externally_ticketed: boolean;
    external_ticketing: ExternalTicketing;
    is_series: boolean;
    is_series_parent: boolean;
    series_id: string;
    is_reserved_seating: boolean;
    show_pick_a_seat: boolean;
    show_seatmap_thumbnail: boolean;
    show_colors_in_seatmap_thumbnail: boolean;
    is_free: boolean;
    source: string;
    version: string;
    resource_uri: string;
    event_sales_status: EventSalesStatus;
    checkout_settings: CheckoutSettings;
}

export interface BookmarkInfo {
    bookmarked: boolean;
}

export interface Category {
    id: string;
    resource_uri: string;
    name: string;
    name_localized: string;
    short_name: string;
    short_name_localized: string;
    subcategories?: SubcategoryElement[];
}

export interface SubcategoryElement {
    id?: string;
    resource_uri?: string;
    name?: string;
    parent_category?: ParentCategory;
}

export interface ParentCategory {
}

export interface CheckoutSettings {
    created: Date;
    changed: Date;
    country_code: string;
    currency_code: string;
    checkout_method: string;
    offline_settings: OfflineSetting[];
    user_instrument_vault_id: string;
}

export interface OfflineSetting {
    payment_method: string;
    instructions: string;
}

export interface Description {
    text: string;
    html: string;
}

export interface End {
    timezone: string;
    utc: string;
    local: string;
}

export interface EventSalesStatus {
    sales_status: string;
    start_sales_date: End;
}

export interface ExternalTicketing {
    external_url: string;
    ticketing_provider_name: string;
    is_free: boolean;
    minimum_ticket_price: ImumTicketPrice;
    maximum_ticket_price: ImumTicketPrice;
    sales_start: string;
    sales_end: string;
}

export interface ImumTicketPrice {
    currency: string;
    value: number;
    major_value: string;
    display: string;
}

export interface Logo {
    id: string;
    url: string;
    crop_mask: CropMask;
    original: Original;
    aspect_ratio: string;
    edge_color: string;
    edge_color_set: boolean;
}

export interface CropMask {
    top_left: TopLeft;
    width: number;
    height: number;
}

export interface TopLeft {
    y: number;
    x: number;
}

export interface Original {
    url: string;
    width: number;
    height: number;
}

export interface MusicProperties {
    age_restriction: null;
    presented_by: null;
    door_time: string;
}

export interface Organizer {
    name: string;
    description: Description;
    long_description: Description;
    logo_id: null;
    logo: Logo;
    resource_uri: string;
    id: string;
    url: string;
    num_past_events: number;
    num_future_events: number;
    twitter: string;
    facebook: string;
}

export interface IEventSubCategory {
    id: string;
    resource_uri: string;
    name: string;
    parent_category: Category;
}

export interface TicketAvailability {
    has_available_tickets: boolean;
    minimum_ticket_price: ImumTicketPrice;
    maximum_ticket_price: ImumTicketPrice;
    is_sold_out: boolean;
    start_sales_date: End;
    waitlist_available: boolean;
}

export interface Venue {
    name: string;
    age_restriction: null;
    capacity: number;
    address: Address;
    resource_uri: string;
    id: string;
    latitude: string;
    longitude: string;
}

export interface Address {
    address_1: null;
    address_2: null;
    city: null;
    region: null;
    postal_code: null;
    country: null;
    latitude: null;
    longitude: null;
}
