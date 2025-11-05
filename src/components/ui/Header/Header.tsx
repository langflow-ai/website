"use client";

// Dependencies
import Link from "@/components/ui/Link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Components
import DownArrow from "@/components/icons/downArrow/DownArrow";
import Display from "@/components/ui/Display";
import Badge from "@/components/ui/Header/Badge";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const leaveTimeout = useRef<any>(null);
  const pathname = usePathname();

  // Check if we're on use-cases or template pages
  const isTransparentPage =
    pathname?.startsWith("/use-cases") || pathname?.startsWith("/templates");

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isActive]);

  // Handle scroll detection for transparent pages
  useEffect(() => {
    if (!isTransparentPage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Show background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransparentPage]);

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
    <section
      className={`${styles.header} ${isTransparentPage && !isScrolled ? styles.transparent : ""}`}
    >
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
                        data-event="UI Interaction"
                        data-action="clicked"
                        data-channel="webpage"
                        data-element-id={`drawer-nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        data-namespace="drawer"
                        data-platform-title="Langflow"
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
                                data-event="UI Interaction"
                                data-action="clicked"
                                data-channel="webpage"
                                data-element-id={`drawer-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                                data-namespace="drawer"
                                data-platform-title="Langflow"
                              >
                                {sub.icon}
                                <Display size={100}>{sub.title}</Display>
                              </a>
                            ) : (
                              <Link
                                key={sub.title}
                                href={sub.url}
                                data-event="UI Interaction"
                                data-action="clicked"
                                data-channel="webpage"
                                data-element-id={`drawer-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                                data-namespace="drawer"
                                data-platform-title="Langflow"
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
            data-event="UI Interaction"
            data-action="clicked"
            data-channel="webpage"
            data-element-id="logo"
            data-namespace="header"
            data-platform-title="Langflow"
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
                      data-event="UI Interaction"
                      data-action="clicked"
                      data-channel="webpage"
                      data-element-id={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      data-namespace="header"
                      data-platform-title="Langflow"
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
                        <div key={sub.title}>
                          {sub.download ? (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownload(sub.url, sub.title);
                              }}
                              download="brandkit.zip"
                              className={styles.downloadLink}
                              data-event="UI Interaction"
                              data-action="clicked"
                              data-channel="webpage"
                              data-element-id={`nav-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                              data-namespace="header"
                              data-platform-title="Langflow"
                            >
                              {sub.icon}
                              <Display size={100}>{sub.title}</Display>
                            </a>
                          ) : (
                            <Link
                              href={sub.url}
                              data-event="UI Interaction"
                              data-action="clicked"
                              data-channel="webpage"
                              data-element-id={`nav-${sub.title.toLowerCase().replace(/\s+/g, "-")}`}
                              data-namespace="header"
                              data-platform-title="Langflow"
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
