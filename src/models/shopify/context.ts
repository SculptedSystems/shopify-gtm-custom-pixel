/**
 * Shopify Web Pixels API - Context
 */

export interface Context {
  document: WebPixelsDocument;
  navigator: WebPixelsNavigator;
  window: WebPixelsWindow;
}

export interface WebPixelsDocument {
  characterSet: string;
  location: Location;
  referrer: string;
  title: string;
}

export interface Location {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
}

export interface WebPixelsNavigator {
  cookieEnabled: boolean;
  language: string;
  languages: string[];
  userAgent: string;
}

export interface WebPixelsWindow {
  innerHeight: number;
  innerWidth: number;
  location: Location;
  origin: string;
  outerHeight: number;
  outerWidth: number;
  pageXOffset: number;
  pageYOffset: number;
  screen: Screen;
  screenX: number;
  screenY: number;
  scrollX: number;
  scrollY: number;
}

export interface Screen {
  height: number;
  width: number;
}
