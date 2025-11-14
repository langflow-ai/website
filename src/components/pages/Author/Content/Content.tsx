"use client";

// Dependencies
import { FC, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import SanityImage from "@/components/ui/media/SanityImage";
import FilterPill from "@/components/common/FilterPill";

// Styles
import styles from "./styles.module.scss";

type ContentItem = {
  type: "post" | "talk" | "event";
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  description?: string;
  publishedAt?: string;
  date?: string;
  duration?: number;
  location?: string;
  featureImage?: any;
  thumbnail?: any;
  event?: {
    _id: string;
    title?: string;
    slug?: { current?: string };
    type?: "virtual" | "in-person";
  };
  eventType?: "virtual" | "in-person";
  dates?: any[];
};

// Props types
type Props = {
  posts?: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    excerpt?: string;
    publishedAt?: string;
    featureImage?: any;
  }>;
  talks?: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    description?: string;
    date?: string;
    duration?: number;
    location?: string;
    thumbnail?: any;
    event?: {
      _id: string;
      title?: string;
      slug?: { current?: string };
      type?: "virtual" | "in-person";
    };
  }>;
  events?: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    type?: "virtual" | "in-person";
    dates?: any[];
    location?: string;
    thumbnail?: any;
  }>;
};

const Content: FC<Props> = ({ posts = [], talks = [], events = [] }) => {
  const [selectedType, setSelectedType] = useState<string>("all");

  const allItems: ContentItem[] = useMemo(() => {
    const items: ContentItem[] = [];
    
    posts.forEach((post) => {
      items.push({
        type: "post",
        _id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        featureImage: post.featureImage,
      });
    });

    talks.forEach((talk) => {
      items.push({
        type: "talk",
        _id: talk._id,
        title: talk.title,
        slug: talk.slug,
        description: talk.description,
        date: talk.date,
        duration: talk.duration,
        location: talk.location,
        thumbnail: talk.thumbnail,
        event: talk.event,
      });
    });

    events.forEach((event) => {
      items.push({
        type: "event",
        _id: event._id,
        title: event.title,
        slug: event.slug,
        eventType: event.type,
        dates: event.dates,
        location: event.location,
        thumbnail: event.thumbnail,
      });
    });

    return items.sort((a, b) => {
      const dateA = a.publishedAt || a.date || (a.dates?.[0]?.date);
      const dateB = b.publishedAt || b.date || (b.dates?.[0]?.date);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [posts, talks, events]);

  const filteredItems = useMemo(() => {
    if (selectedType === "all") {
      return allItems;
    }
    return allItems.filter((item) => item.type === selectedType);
  }, [allItems, selectedType]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
  };

  const formatEventDate = (dates?: any[]) => {
    if (!dates || dates.length === 0) return null;
    const firstDate = dates[0]?.date;
    if (!firstDate) return null;
    return formatDate(firstDate);
  };

  const getItemUrl = (item: ContentItem) => {
    if (item.type === "post") {
      return `/blog/${item.slug?.current}`;
    }
    if (item.type === "talk") {
      return `/talks/${item.slug?.current}`;
    }
    if (item.type === "event") {
      return `/events/${item.slug?.current}`;
    }
    return "#";
  };

  const hasContent = posts.length > 0 || talks.length > 0 || events.length > 0;

  if (!hasContent) {
    return null;
  }

  const postCount = posts.length;
  const talkCount = talks.length;
  const eventCount = events.length;
  const totalCount = postCount + talkCount + eventCount;
  const displayCount = selectedType === "all" ? totalCount : filteredItems.length;

  return (
    <section className={styles.content}>
      <div className="container">
        <div className={styles.header}>
          <Display size={400} tagName="h2" className={styles.heading}>
            Content ({displayCount})
          </Display>
          <div className={styles.filters}>
            <FilterPill
              label={`All (${totalCount})`}
              value="all"
              selected={selectedType === "all"}
              onToggle={() => handleTypeSelect("all")}
            />
            {postCount > 0 && (
              <FilterPill
                label={`Posts (${postCount})`}
                value="post"
                selected={selectedType === "post"}
                onToggle={() => handleTypeSelect("post")}
              />
            )}
            {talkCount > 0 && (
              <FilterPill
                label={`Talks (${talkCount})`}
                value="talk"
                selected={selectedType === "talk"}
                onToggle={() => handleTypeSelect("talk")}
              />
            )}
            {eventCount > 0 && (
              <FilterPill
                label={`Events (${eventCount})`}
                value="event"
                selected={selectedType === "event"}
                onToggle={() => handleTypeSelect("event")}
              />
            )}
          </div>
        </div>
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <Link
              key={item._id}
              href={getItemUrl(item)}
              className={styles.item}
            >
              <div className={styles.typeBadge}>
                {item.type === "post" ? "Blog" : item.type === "talk" ? "Talk" : "Event"}
              </div>
              {(item.featureImage || item.thumbnail) && (
                <>
                  {typeof (item.featureImage || item.thumbnail) === 'string' ? (
                    <Image
                      src={item.featureImage || item.thumbnail}
                      alt={item.title || ""}
                      className={styles.image}
                      width={300}
                      height={300}
                    />
                  ) : (
                    <SanityImage
                      image={item.featureImage || item.thumbnail}
                      alt={item.title || ""}
                      className={styles.image}
                      width={300}
                    />
                  )}
                </>
              )}
              <div className={styles.itemContent}>
                {item.type === "talk" && item.event && (
                  <Text size={100} className={styles.metaText}>
                    {item.event.title}
                  </Text>
                )}
                {item.type === "event" && (
                  <div className={styles.meta}>
                    {item.eventType && (
                      <Text size={100} className={styles.metaText}>
                        {item.eventType === "in-person" ? "In Person" : "Virtual"}
                      </Text>
                    )}
                    {formatEventDate(item.dates) && (
                      <Text size={100} className={styles.metaText}>
                        {formatEventDate(item.dates)}
                      </Text>
                    )}
                  </div>
                )}
                <Display size={300} tagName="h3" className={styles.title}>
                  {item.title}
                </Display>
                {item.type === "post" && item.excerpt && (
                  <Text size={200} className={styles.description}>
                    {item.excerpt}
                  </Text>
                )}
                <div className={styles.footer}>
                  {item.type === "post" && item.publishedAt && (
                    <Text size={100} className={styles.date}>
                      {formatDate(item.publishedAt)}
                    </Text>
                  )}
                  {item.type === "talk" && item.date && (
                    <Text size={100} className={styles.date}>
                      {formatDate(item.date)}
                    </Text>
                  )}
                  {item.type === "event" && item.location && (
                    <Text size={200} className={styles.location}>
                      {item.location}
                    </Text>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;

