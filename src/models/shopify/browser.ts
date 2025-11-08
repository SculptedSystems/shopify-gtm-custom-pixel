/**
 * Shopify Web Pixels API - Browser Interface
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/browser
 */

export interface Browser {
  cookie: BrowserCookie;
  localStorage: BrowserLocalStorage;
  sessionStorage: BrowserSessionStorage;
  sendBeacon?: (url: string, body?: string) => Promise<boolean>;
}

export interface BrowserCookie {
  get?: (name?: string) => Promise<string>;
  set?: (cookieOrName: string, value?: string) => Promise<string>;
}

export interface BrowserLocalStorage {
  clear?: () => Promise<void>;
  getItem?: (key: string) => Promise<string>;
  key?: (index: number) => Promise<string>;
  length?: () => Promise<number>;
  removeItem?: (key: string) => Promise<void>;
  // @ts-expect-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem?: (key: string, value: any) => Promise<void>;
}

export interface BrowserSessionStorage {
  clear?: () => Promise<void>;
  getItem?: (key: string) => Promise<string>;
  key?: (index: number) => Promise<string>;
  length?: () => Promise<number>;
  removeItem?: (key: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem?: (key: string, value: any) => Promise<void>;
}
