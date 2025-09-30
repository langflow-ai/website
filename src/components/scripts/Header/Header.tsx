// Dependencies
import Script from "next/script";
import { SEGMENT_COMMON_PROPERTIES } from "@/lib/utils/tracking";

const segmentWriteKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || "iVEXvycYxeZTDOyN71Egh2pWtLeuFHBr";

const Header = () => {
  return (
    <>
      <script
        async
        id="munchkin-script"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          (function () {
            var didInit = false;

            function initMunchkin() {
              if (didInit === false) {
                didInit = true;
                Munchkin.init("259-IFZ-779", {
                  asyncOnly: true,
                  disableClickDelay: true,
                });

                setTimeout(() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "script-onload",
                  });
                }, 1000);
              }
            }

            function loadMunchkin() {
              // Check for advertising consent (category 2)
              if (typeof window.truste !== 'undefined' && window.truste.cma) {
                var consent = window.truste.cma.callApi('getConsent', window.location.href) || {};
                var hasAdvertising = consent[2] === 1;

                if (hasAdvertising) {
                  var s = document.createElement("script");
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://munchkin.marketo.net/munchkin.js";
                  s.onreadystatechange = function () {
                    if (this.readyState == "complete" || this.readyState == "loaded") {
                      initMunchkin();
                    }
                  };
                  s.onload = initMunchkin;
                  document.getElementsByTagName("head")[0].appendChild(s);
                }
              }
            }

            // Listen for consent changes
            if (window.addEventListener) {
              window.addEventListener('cm_data_subject_consent_changed', loadMunchkin);
              window.addEventListener('cm_consent_preferences_set', loadMunchkin);
            }

            // Initial check
            if (document.readyState === 'complete') {
              loadMunchkin();
            } else {
              window.addEventListener('load', loadMunchkin);
            }
          })();
          `,
        }}
      />
      {/* IBM Consent Banner */}
      <Script
        id="ibm-analytics-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._ibmAnalytics = {
              "settings": {
                "name": "DataStax",
                "tealiumProfileName": "ibm-subsidiary",
              },
              "trustarc": {
                "privacyPolicyLink": "https://ibm.com/privacy"
              },
              "digitalData.page.services.google.enabled": true
            };
            window.digitalData = {
              "page": {
                "pageInfo": {
                  "ibm": {
                    "siteId": "IBM_" + _ibmAnalytics.settings.name,
                  },
                  segment: {
                    enabled: true,
                    env: 'prod',
                    key: '${segmentWriteKey}',
                    coremetrics: false,
                    carbonComponentEvents: false,
                    commonProperties: ${JSON.stringify(SEGMENT_COMMON_PROPERTIES)}
                  }
                },
                "category": {
                  "primaryCategory": "PC230"
                }
              }
            };
          `
        }}
      />
      <Script
        src="//1.www.s81c.com/common/stats/ibm-common.js"
        strategy="afterInteractive"
        async
      />

      {/* Google Consent Mode - Set defaults before Google tags load */}
      <Script
        id="google-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent to denied
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `
        }}
      />
      {/* TrustArc Consent Update Listener */}
      <Script
        id="trustarc-consent-listener"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateGoogleConsent() {
                if (typeof window.truste !== 'undefined' && window.truste.cma) {
                  var consent = window.truste.cma.callApi('getConsent', window.location.href) || {};

                  // Map TrustArc categories to Google consent types
                  // Category 0 = Required, 1 = Functional, 2 = Advertising, 3 = Analytics
                  var hasAdvertising = consent[2] === 1;
                  var hasAnalytics = consent[3] === 1;

                  gtag('consent', 'update', {
                    'ad_storage': hasAdvertising ? 'granted' : 'denied',
                    'ad_user_data': hasAdvertising ? 'granted' : 'denied',
                    'ad_personalization': hasAdvertising ? 'granted' : 'denied',
                    'analytics_storage': hasAnalytics ? 'granted' : 'denied'
                  });
                }
              }

              // Listen for consent changes
              if (window.addEventListener) {
                window.addEventListener('cm_data_subject_consent_changed', updateGoogleConsent);
                window.addEventListener('cm_consent_preferences_set', updateGoogleConsent);
              }

              // Initial check after TrustArc loads
              if (document.readyState === 'complete') {
                updateGoogleConsent();
              } else {
                window.addEventListener('load', updateGoogleConsent);
              }
            })();
          `
        }}
      />
      {/* Google Analytics Scripts */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L8Y98PSEMQ" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L8Y98PSEMQ', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: false
              });
              // Send page view after critical resources have loaded
              window.addEventListener('load', () => {
                gtag('event', 'page_view');
              });
            `,
        }}
      />
      {/* Google Ads tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-995363228" />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-995363228');
            `,
        }}
      />
      {/* Segment Script - Standalone */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="${segmentWriteKey}";;analytics.SNIPPET_VERSION="5.2.0";analytics.load("${segmentWriteKey}");analytics.page();}}();`
        }}
      />
      {/* TrustArc Consent Management - Commented out for testing */}
      {/* <Script
        src="https://consent.trustarc.com/get?name=trustarc-segment-wrapper-v1.1.js"
        strategy="afterInteractive"
      />
      <Script
        id="segment-trustarc-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof TrustArcWrapper !== 'undefined' && window.analytics) {
                TrustArcWrapper.withTrustArc(window.analytics).load('${segmentWriteKey}');
              } else {
                console.error('TrustArcWrapper not loaded or analytics not initialized');
              }
            })();
          `
        }}
      /> */}
    </>
  );
};

export default Header;
