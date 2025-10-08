import {
  RingLeadInstantBookCallback,
  RingLeadInstantBookInit,
} from "./ringlead";

export type GoogleTagWindow = Window & {
  gtag: any;
  jpgtag: any;
  dataLayer: any[];
};

export type AnalyticsWindow = Window & {
  analytics_loaded: boolean;
  analytics: any;
};

export type KatacodaWindow = Window & {
  katacoda: any;
};

export type MarketoWindow = Window & {
  MktoForms2: any;
  srpro: {
    debug?: boolean;
    isLoaded?: boolean;
    version?: string;
    enriched_fields?: Record<string, string>;
    ziPassingScore?: number;
    invalidDomains?: string[];
    isEmailGood?: (email: string) => boolean;
    addTagToMktForm?: (id: string) => void;
    initZoomInfo?: () => void;
    ziScoreListiner?: (form: any) => void;
    countryListiner?: () => void;
    setStateOption?: (country: string) => void;
  };
};

export type JqueryWindow = Window & {
  jQuery: any;
};

export type IntercomWindow = Window & {
  Intercom: any;
};

export type MixPanelWindow = Window & {
  mixpanel: any;
};

export type ChiliPiperWindow = Window & {
  ChiliPiper: any;
};

export type RingLeadInstantBookType = Window & {
  init: RingLeadInstantBookInit;
  instantBookCallBack: RingLeadInstantBookCallback;
};
export type GreCAPTCHAWindow = Window & {
  grecaptcha: any;
};

export type LinkedInInsightWindow = Window & {
  lintrk: any;
};

export type IBMAnalyticsWindow = Window & {
  _ibmAnalytics: any;
  digitalData: any;
};

export type SequelWindow = Window & {
  Sequel: any;
};

export type DemandbaseWindow = Window & {
  Demandbase: any;
};

export type CustomWindow = AnalyticsWindow &
  GoogleTagWindow &
  KatacodaWindow &
  MarketoWindow &
  JqueryWindow &
  IntercomWindow &
  MixPanelWindow &
  ChiliPiperWindow &
  RingLeadInstantBookType &
  GreCAPTCHAWindow &
  DemandbaseWindow &
  IBMAnalyticsWindow &
  SequelWindow &
  LinkedInInsightWindow;
