// Dependencies
import Image from "next/image";
import Link from "@/components/ui/Link";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const DownloadButton = ({ url }: { url: string }) => {
  return (
    <div className={styles.downloadButton}>
      <Image
        src={
          "/images/apple.avif"
        }
        alt={""}
        width={20}
        height={24}
      />
      <Link href={url}>
        <Display size={100} className={"text-center text-black"}>
          {"Download Langflow"}
        </Display>
      </Link>
    </div>
  );
};

export default DownloadButton;
