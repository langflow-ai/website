// Dependencies
import Script from "next/script";

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-L8Y98PSEMQ`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L8Y98PSEMQ');
            `,
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){window.semaphore=window.semaphore||[],window.ketch=function(){window.semaphore.push(arguments)};var e=document.createElement("script");e.type="text/javascript",e.src="https://global.ketchcdn.com/web/v3/config/datastax/langflow_org_web/boot.js",e.defer=e.async=!0,document.getElementsByTagName("head")[0].appendChild(e)}();`,
        }}
      />
    </>
  );
};

export default Header;
