// Dependencies
import { FC, useMemo } from "react";
import Highlight from "react-highlight";

// Components
import CopyToClipboard from "./Copy";

// Styles
import styles from "./styles.module.scss";

// Props type
type Props = {
  value: {
    _key: string;
    _type: "code";
    code: string;
    language: string;
  };
  isInline: boolean;
  index: number;
  renderNode?: unknown;
};

const Code: FC<Props> = (props) => {
  // Variables
  const { code, language } = props.value;

  const sanitizedCode = useMemo(() => {
    return (
      code
        .replace(/<(span|strong).*?>|<\/(span|strong)>/gi, "") // remove the span elements that are not needed in the markup
        .replace(/<br \/>/gi, "\n") // replace line breaks with plain text line breaks
        .replace(/<br\/?>/gi, "\n") // replace line breaks with plain text line breaks
        .replace(/\&(nbsp)\;/gi, " ") // replace spacing elements that were ignored
        // .replace(/&/gi, "&amp;") // replace & with its escaped value
        .replace(/</gi, "&lt;") // replace < with its escaped value
        .replace(/>/gi, "&gt;") // replace > with its escaped value
        .replace(/&lt;s&gt;/gi, "<s>") // Restore the <s> tag element
        .replace(/&lt;\/s&gt;/gi, "</s>") // Restore the <\s> close tag element
        .replace(
          /&lt;a href="(.*?)"&gt;(.*?)&lt;\/a&gt;/gi,
          '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
        ) // Preserve <a> tags (with href)
    );
  }, [code]);

  return (
    <div className={styles.code}>
      <CopyToClipboard code={sanitizedCode} />
      <Highlight className={language ? `language-${language}` : ""}>
        {sanitizedCode}
      </Highlight>
    </div>
  );
};

export default Code;
