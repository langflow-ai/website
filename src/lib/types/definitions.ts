// import { SanityImageType } from "./sanity";
import { UrlObject } from "url";

/**
 * TypeScript definitions
 * Use this definitions file to create Global TypeScript Definitions
 * that can be used on any part of the project.
 *
 */
export type Json =
  | string
  | number
  | boolean
  | { [property: string]: any }
  | Json[]
  | any;

export type CSSModule = {
  [key: string]: string;
};

// export type MappedImages = {
//   [key: string]: SanityImageType | undefined;
// };

export type ImageLayout = "intrinsic" | "fixed" | "responsive" | "fill";

export type ImageLoading = "lazy" | "eager";

export type ImagePlaceholder = "blur" | "empty";

export type Vertical = "astra" | "luna" | "enterprise" | "ds";

export type Position = "center" | "left" | "right";

export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ClassNameHash = {
  [index: string]: boolean;
};

export declare type Url = string | UrlObject;

export enum PageTemplate {
  Legacy = "legacy",
  UI2023 = "2023",
  UI2024 = "2024",
  DARK2025 = "2025-dark",
  Product = "product",
  CassandraHealth = "cassandra-health",
}

export type NFT = {
  name: string;
  block_number: number;
  token_id: number;
  metadata: {
    name: string;
    image: string;
  };
};

export enum Breakpoint {
  XS = "xs",
  SM = "sm",
  MD = "md",
  MLG = "mlg",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
}
