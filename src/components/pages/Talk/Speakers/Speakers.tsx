// Dependencies
import { FC } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/backend/sanity/client";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  speakers: Array<{
    _id: string;
    name?: string;
    slug?: { current?: string };
    avatar?: any;
    bio?: string;
  }>;
};

const Speakers: FC<Props> = ({ speakers }) => {
  if (!speakers || speakers.length === 0) {
    return null;
  }

  return (
    <section className={styles.speakers}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Display size={400} tagName="h2" className={styles.heading}>
              Speakers
            </Display>
            <div className={styles.grid}>
              {speakers.map((speaker) => {
                const avatarUrl = speaker.avatar
                  ? getImageUrl(speaker.avatar)
                  : null;

                return (
                  <div key={speaker._id} className={styles.speaker}>
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt={speaker.name || "Speaker"}
                        className={styles.avatar}
                      />
                    )}
                    <div className={styles.info}>
                      {speaker.slug?.current ? (
                        <Link
                          href={`/authors/${speaker.slug.current}`}
                          className={styles.name}
                        >
                          {speaker.name}
                        </Link>
                      ) : (
                        <Display size={200} tagName="h3" className={styles.name}>
                          {speaker.name}
                        </Display>
                      )}
                      {speaker.bio && (
                        <Text size={100} className={styles.bio}>
                          {speaker.bio}
                        </Text>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;


