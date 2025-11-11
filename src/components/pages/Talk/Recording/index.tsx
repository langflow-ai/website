import ReactPlayer from "react-player";
import styles from "./styles.module.scss";

export default function Recording({ src }: { src: string }) {
  return (
    <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <ReactPlayer className={styles.recording} src={src} />
              </div>
            </div>
          </div>
        </section>
  );
}