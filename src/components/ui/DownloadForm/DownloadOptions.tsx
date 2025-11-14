// Utilities
import { DOWNLOAD_OPTIONS } from "@/utils/constants";
import { trackEvent } from "@/lib/utils/tracking";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const DownloadOptions = () => {
  const handleDownload = async (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    trackEvent("Langflow.org - Langflow Desktop Downloaded", {
      text: "Download",
      filename: filename,
    });
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return (
    <div className={styles.list}>
      {DOWNLOAD_OPTIONS.map((option) => (
        <div key={option.name} className={styles.listItem}>
          <div
            className={`${styles.detailsItem} ${option.isComingSoon ? styles.opacity : ""}`}
          >
            {option.icon}
            <Display size={100} weight={600} className={styles.itemName}>
              {option.name}
            </Display>
          </div>

          {option.isComingSoon ? (
            <Display size={100} weight={400} className={styles.comingSoon}>
              Coming Soon
            </Display>
          ) : (
            <a
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload(option.link, option.fileName);
              }}
              className={styles.downloadButton}
            >
              <Display
                size={100}
                weight={600}
                className={"text-center text-black"}
              >
                {option.btnText}
              </Display>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default DownloadOptions;
