"use client";

// Dependencies
import { useEffect, useState } from "react";

// Components
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";

// Styles
import { SOCIALS } from "@/utils/constants";
import styles from "./styles.module.scss";

const Social = () => {
  const [socialCounts, setSocialCounts] = useState({
    github: "138k",
    discord: "18k",
    youtube: "11k",
  });

  useEffect(() => {
    const fetchSocialCounts = async () => {
      try {
        // GitHub API request for stars count - try official API first, fallback to shields.io
        let githubStars = null;
        try {
          // Try official GitHub API first
          const githubResponse = await fetch(
            "https://api.github.com/repos/langflow-ai/langflow",
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            }
          );
          
          if (githubResponse.ok) {
            const githubData = await githubResponse.json();
            const stars = githubData?.stargazers_count;
            if (stars) {
              const roundedStars = Math.round(stars / 1000);
              githubStars = `${roundedStars}k`;
            }
          }
        } catch (githubError) {
          console.warn("GitHub API failed, trying shields.io fallback", githubError);
          // Fallback to shields.io
          try {
            const shieldsResponse = await fetch(
              "https://img.shields.io/github/stars/langflow-ai/langflow.json"
            );
            if (shieldsResponse.ok) {
              const shieldsData = await shieldsResponse.json();
              githubStars = shieldsData?.value;
            }
          } catch (shieldsError) {
            console.warn("Shields.io also failed", shieldsError);
          }
        }

        // Discord API request for member count
        let formattedMembers = null;
        try {
          const discordResponse = await fetch(
            "https://discord.com/api/v9/invites/EqksyE2EX9?with_counts=true&with_expiration=true"
          );
          if (discordResponse.ok) {
            const discordData = await discordResponse.json();
            const discordMembers = discordData?.approximate_member_count;
            if (discordMembers) {
              const roundedMembers = Math.round(discordMembers / 1000);
              formattedMembers = `${roundedMembers}k`;
            }
          }
        } catch (discordError) {
          console.warn("Discord API failed", discordError);
        }

        // YouTube API request for subscribers count
        let youtubeSubscribers = null;
        try {
          const youtubeResponse = await fetch(
            "https://img.shields.io/youtube/channel/subscribers/UCn2bInQrjdDYKEEmbpwblLQ.json?label=Subscribe"
          );
          if (youtubeResponse.ok) {
            const youtubeData = await youtubeResponse.json();
            youtubeSubscribers = youtubeData?.value;
          }
        } catch (youtubeError) {
          console.warn("YouTube API failed", youtubeError);
        }

        // Set state with fetched data, only update if we got valid data
        setSocialCounts((prev) => ({
          github: githubStars || prev.github,
          discord: formattedMembers || prev.discord,
          youtube: youtubeSubscribers || prev.youtube,
        }));
      } catch (error) {
        console.error("Error fetching social counts", error);
        // Keep default values on error
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
