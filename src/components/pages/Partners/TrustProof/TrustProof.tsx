"use client";

import Discord from "@/components/icons/discord/Discord";
import Github from "@/components/icons/github/Github";
import Twitter from "@/components/icons/Twitter/Twitter";
import Youtube from "@/components/icons/youtube/Youtube";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { trackSocialClick } from "@/lib/utils/analytics";
import styles from "./styles.module.scss";

const SOCIAL_LINKS = [
  {
    icon: <Github />,
    name: "GitHub",
    url: "https://github.com/logspace-ai/langflow",
    followers: "127k+ stars"
  },
  {
    icon: <Discord />,
    name: "Discord",
    url: "https://discord.gg/langflow",
    followers: "22k+ members"
  },
  {
    icon: <Twitter />,
    name: "X (Twitter)",
    url: "https://twitter.com/langflow_ai",
    followers: "10k+ followers"
  },
  {
    icon: <Youtube />,
    name: "YouTube",
    url: "https://youtube.com/@langflow",
    followers: "14k+ subscribers"
  },
];

const TrustProof = () => {
  return (
    <section className={styles.trustProof}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.header}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            Join Our Growing Community
          </Text>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Connect with thousands of developers and businesses already using Langflow
          </Text>
        </div>
        
        <div className={styles.socialGrid}>
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              data-attr={`partners-social-${social.name.toLowerCase()}`}
              onClick={() => trackSocialClick(social.name)}
            >
              <div className={styles.socialIcon}>
                {social.icon}
              </div>
              <div className={styles.socialContent}>
                <Text size={400} weight={Weight.Semibold} className={styles.socialName}>
                  {social.name}
                </Text>
                <Text size={300} weight={Weight.Regular} className={styles.socialFollowers}>
                  {social.followers}
                </Text>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustProof;
