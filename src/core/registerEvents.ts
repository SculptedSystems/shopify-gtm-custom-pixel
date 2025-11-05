import { config } from "@core/config";

import { registerPageView } from "@events/pageView";
import { registerViewItemList } from "@events/viewItemList";
import { registerViewItem } from "@events/viewItem";
import { registerAddToCart } from "@events/addToCart";
import { registerViewCart } from "@events/viewCart";
import { registerBeginCheckout } from "@events/beginCheckout";
import { registerAddShippingInfo } from "@events/addShippingInfo";
import { registerAddPaymentInfo } from "@events/addPaymentInfo";
import { registerPurchase } from "@events/purchase";

export function registerEvents() {
  if (config.gtm.track.pageView) {
    registerPageView();
  }

  if (config.gtm.track.viewItemList) {
    registerViewItemList();
  }

  if (config.gtm.track.viewItem) {
    registerViewItem();
  }

  if (config.gtm.track.addToCart) {
    registerAddToCart();
  }

  if (config.gtm.track.viewCart) {
    registerViewCart();
  }

  if (config.gtm.track.beginCheckout) {
    registerBeginCheckout();
  }

  if (config.gtm.track.addShippingInfo) {
    registerAddShippingInfo();
  }

  if (config.gtm.track.addPaymentInfo) {
    registerAddPaymentInfo();
  }

  if (config.gtm.track.purchase) {
    registerPurchase();
  }
}
