"use client";

// Dependencies
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/Link";

// Components
import Badge from "@/components/ui/Header/Badge";
import Display from "@/components/ui/Display";
import DownArrow from "@/components/icons/downArrow/DownArrow";
import Social from "../Social";
// Utils
import { LIST } from "@/utils/constants";

// Assests
import Logo from "../../../../public/images/logo.png";

// Styles
import styles from "./styles.module.scss";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leaveTimeout = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isActive]);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleDownload = (url: string, filename: string) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("File not found");
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        alert("File is currently unavailable. Please try again later.");
      });
  };

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        {isActive && (
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isActive}
          >
            <div className={styles.drawerContent}>
              {LIST.map((item) => (
                <div key={item.title}>
                  <div className={styles.drawerItem}>
                    {item?.link ? (
                      <Link
                        href={item.link}
                        data-event="Langflow.org - Nav Clicked"
                        data-top-level={item.title}
                      >
                        <Display
                          size={100}
                          className={styles.drawerItem_heading}
                        >
                          {item.title}
                        </Display>
                      </Link>
                    ) : (
                      <Display size={100} className={styles.drawerItem_heading}>
                        {item.title}
                      </Display>
                    )}

                    {item.comingSoon && <Badge />}
                  </div>
                  <div>
                    {item.subTabs && (
                      <div className={styles.drawerSubItemContainer}>
                        {item.subTabs.map((sub) => (
                          <div key={sub.title} className={styles.drawerSubItem}>
                            {sub.download ? (
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDownload(sub.url, sub.title);
                                }}
                                download="brandkit.zip"
                                className={styles.downloadLink}
                                data-event="Langflow.org - Nav Clicked"
                                data-top-level={item.title}
                                data-sub-level={sub.title}
                              >
                                {sub.icon}
                                <Display size={100}>{sub.title}</Display>
                              </a>
                            ) : (
                              <Link
                                key={sub.title}
                                href={sub.url}
                                data-event="Langflow.org - Nav Clicked"
                                data-top-level={item.title}
                                data-sub-level={sub.title}
                              >
                                {sub.icon}
                                {sub.title}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.left}>
          <Link
            href={"/"}
            data-event="Langflow.org - Logo Clicked"
            data-text="Langflow"
          >
            <Image
              src={Logo}
              alt="Langflow Logo"
              width={123}
              height={24}
              className={styles.left_img}
            />
          </Link>
          <nav className={styles.nav}>
            {LIST.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={item.title}
                  className={styles.navItem}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    clearTimeout(leaveTimeout.current);
                    leaveTimeout.current = setTimeout(
                      () => setHoveredIndex(null),
                      200
                    );
                  }}
                >
                  {item?.link ? (
                    <Link
                      href={item.link}
                      data-event="Langflow.org - Nav Clicked"
                      data-top-level={item.title}
                    >
                      <Display size={100} className={styles.drawerItem_heading}>
                        {item.title}
                      </Display>
                    </Link>
                  ) : (
                    <Display size={100} className={styles.drawerItem_heading}>
                      {item.title}
                    </Display>
                  )}

                  {item?.subTabs && <DownArrow />}
                  {item?.comingSoon && <Badge />}

                  {item?.subTabs && isHovered && (
                    <div
                      className={
                        item?.title === "Get Help"
                          ? styles.dropdownGetHelp
                          : styles.dropdown
                      }
                      onMouseEnter={() => clearTimeout(leaveTimeout.current)}
                      onMouseLeave={() => {
                        leaveTimeout.current = setTimeout(
                          () => setHoveredIndex(null),
                          200
                        );
                      }}
                    >
                      {item.subTabs.map((sub) => (
                        <>
                          {sub.download ? (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownload(sub.url, sub.title);
                              }}
                              download="brandkit.zip"
                              className={styles.downloadLink}
                            >
                              {sub.icon}
                              <Display size={100}>{sub.title}</Display>
                            </a>
                          ) : (
                            <Link
                              key={sub.title}
                              href={sub.url}
                              data-event="Langflow.org - Nav Clicked"
                              data-top-level={item.title}
                              data-sub-level={sub.title}
                            >
                              {sub.icon}
                              {sub.title}
                            </Link>
                          )}
                        </>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className={styles.right}>
          <Social />
        </div>
        <div
          className={`${styles.menuButton} ${isActive ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Header;
