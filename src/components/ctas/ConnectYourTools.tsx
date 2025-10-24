// ConnectYourTools Organism Component

import styles from "./ConnectYourTools.module.scss";

interface ConnectYourToolsProps {
  className?: string;
}

const INTEGRATION_TOOLS = [
  { name: "Pinecone", icon: "🌲" },
  { name: "Yahoo! Finance", icon: "📈" },
  { name: "Gmail", icon: "📧" },
  { name: "Wikipedia", icon: "📚" },
  { name: "Milvus", icon: "🗄️" },
  { name: "Perplexity", icon: "🤔" },
  { name: "Couchbase", icon: "🛋️" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "Glean", icon: "🔍" },
  { name: "Airbyte", icon: "✈️" },
  { name: "NVIDIA", icon: "🎮" }
];

export default function ConnectYourTools({ className = "" }: ConnectYourToolsProps) {
  return (
    <section className={`${styles.connectYourTools} ${className}`}>
      <div className="container">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Connect your existing tools
            </h2>
          </div>
          
          {/* Tools Grid */}
          <div className={styles.toolsGrid}>
            {INTEGRATION_TOOLS.map((tool, index) => (
              <div
                key={index}
                className={styles.toolPill}
              >
                <span className={styles.icon}>
                  {tool.icon}
                </span>
                <span className={styles.name}>
                  {tool.name}
                </span>
              </div>
            ))}
            
            {/* Show More Button */}
            <button className={styles.showMoreButton}>
              Show more
              <svg className={styles.arrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
