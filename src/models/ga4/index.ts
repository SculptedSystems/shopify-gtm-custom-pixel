/**
 * GA4 - item
 * Source: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */

export interface Item {
  item_id: string;
  item_name: string;

  affiliation: string | null;

  coupon: string | null;
  discount: number | null;

  index: number | null;

  item_brand: string | null;

  item_category: string | null;
  item_category2: string | null;
  item_category3: string | null;
  item_category4: string | null;
  item_category5: string | null;

  item_list_id: string | null;
  item_list_name: string | null;

  item_variant: string | null;

  location_id: string | null;

  price: number | null;
  quantity: number | null;
}
