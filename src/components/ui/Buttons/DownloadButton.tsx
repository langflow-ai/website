// Dependencies
import Image from "next/image";
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const DownloadButton = ({ url }: { url: string }) => {
  return (
    <div className={styles.downloadButton}>
      <Image
        src={
          "https://framerusercontent.com/images/NAwNuA5tzxlT0do1DGE0KugNGmA.png"
        }
        alt={""}
        width={20}
        height={24}
      />
      <Link href={url} target="_blank">
        <Display size={100} className={"text-center text-black"}>
          {"Download (Alpha)"}
        </Display>
      </Link>
    </div>
  );
};

export default DownloadButton;
