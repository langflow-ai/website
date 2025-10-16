// Dependencies
import Script from "next/script";

const segmentWriteKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || "Eqt9jQ2FWQz2HYogszsQHfodPWehAVGs";

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
          })();
          `,
        }}
      />
      {/* Google Analytics Scripts */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-L8Y98PSEMQ`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L8Y98PSEMQ');
            `
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){window.semaphore=window.semaphore||[],window.ketch=function(){window.semaphore.push(arguments)};var e=document.createElement("script");e.type="text/javascript",e.src="https://global.ketchcdn.com/web/v3/config/datastax/langflow_org_web/boot.js",e.defer=e.async=!0,document.getElementsByTagName("head")[0].appendChild(e)}();`
        }}
      />

      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-995363228" />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-995363228');
            `
        }}
      />
      {/* Segment Scripts */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="${segmentWriteKey}";;analytics.SNIPPET_VERSION="5.2.0";
          analytics.load("${segmentWriteKey}");
          analytics.page();
          }}();`
        }}
      />
      {/* Reddit Pixel scripts */}
      <Script
        id="reddit-pixel"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_4q7ujt12');rdt('track', 'PageVisit');`,
        }}
      />
    </>
  );
};

export default Header;
