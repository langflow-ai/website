"use client";

// Dependencies
import { useState, useEffect } from "react";

// Components
import Link from "@/components/ui/Link";
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";
import { SOCIALS } from "@/utils/constants";

const Social = () => {
  const [socialCounts, setSocialCounts] = useState({
    github: "138k",
    discord: "18k",
    youtube: "11k",
  });

  useEffect(() => {
    const fetchSocialCounts = async () => {
      try {
        // GitHub API request for stars count
        const githubResponse = await fetch(
          "https://img.shields.io/github/stars/langflow-ai/langflow.json"
        );
        const githubData = await githubResponse.json();
        const githubStars = githubData?.value;

        // Discord API request for member count
        const discordResponse = await fetch(
          "https://discord.com/api/v9/invites/EqksyE2EX9?with_counts=true&with_expiration=true"
        );
        const discordData = await discordResponse.json();
        const discordMembers = discordData?.approximate_member_count;
        const roundedMembers = Math.round(discordMembers / 1000);
        const formattedMembers = `${roundedMembers}k`;

        // YouTube API request for subscribers count
        const youtubeResponse = await fetch(
          "https://img.shields.io/youtube/channel/subscribers/UCn2bInQrjdDYKEEmbpwblLQ.json?label=Subscribe"
        );
        const youtubeData = await youtubeResponse.json();
        const youtubeSubscribers = youtubeData?.value;

        // Set state with fetched data
        setSocialCounts({
          github:
            githubStars !== "Unable to select next GitHub token from pool"
              ? githubStars
              : "138k",
          discord: formattedMembers,
          youtube: youtubeSubscribers,
        });
      } catch (error) {
        console.error("Error fetching social counts", error);
      }
    };

    fetchSocialCounts();
  }, []); // Only run once when the component mounts

  return (
    <div className={styles.container}>
      {SOCIALS.map((s, index) => (
        <div key={index}>
          <Link
            href={s.url}
            target="_blank"
            data-event="UI Interaction"
            data-action="clicked"
            data-channel="webpage"
            data-element-id={`social-${s.platform}`}
            data-namespace="header"
            data-platform-title="Langflow"
          >
            <div className={styles.social}>
              {s.icon}
              <Display size={100} weight={400}>
                {
                  // Dynamically display the count based on the platform
                  s.platform === "github"
                    ? socialCounts.github
                    : s.platform === "discord"
                      ? socialCounts.discord
                      : s.platform === "youtube"
                        ? socialCounts.youtube
                        : s.count
                }
              </Display>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Social;
