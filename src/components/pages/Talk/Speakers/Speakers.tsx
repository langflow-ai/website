// Dependencies
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

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
                // Avatar is now a direct URL string
                const avatarUrl = typeof speaker.avatar === 'string' ? speaker.avatar : null;

                return (
                  <div key={speaker._id} className={styles.speaker}>
                    {avatarUrl && (
                      <Image
                        src={avatarUrl}
                        alt={speaker.name || "Speaker"}
                        className={styles.avatar}
                        width={80}
                        height={80}
                      />
                    )}
                    <div className={styles.info}>
                      {speaker.slug?.current ? (
                        <Link
                          href={`/people/${speaker.slug.current}`}
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


