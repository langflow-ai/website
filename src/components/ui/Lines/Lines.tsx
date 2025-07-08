"use client";

// Dependencies
import { Fragment } from "react";

// Types
import { Mode } from ".";

// Hooks
import useCheckMobile from "@/hooks/useCheckMobile";

// Props types
type Props = {
  /**
   * Indicates if multiple line breaks should be converted into a single break.
   * Defaults to `true`.
   */
  compact?: boolean;
  /**
   * The break mode. Defaults to `Mode.Paragraph`.
   */
  mode?: Mode;
  /**
   * The text string that must be split.
   */
  text: string;
  /**
   * Wrap the line Mode.Break lines with a span wrapper
   * Defaults to `false`.
   */
  wrap?: boolean;
  /**
   * Removes line break on mobile
   * Defaults to `false`.
   */
  removeLineBreakOnMobile?: boolean;
  /**
   * Removes line break
   * Defaults to `false`.
   */
  noLineBreak?: boolean;
};

/**
 * Renders a string as multiple lines using `<p>` or `<br>` elements.
 *
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Lines = ({
  compact,
  mode = Mode.Paragraph,
  text,
  wrap = false,
  noLineBreak,
  removeLineBreakOnMobile = false,
}: Props): JSX.Element => {
  // Values
  const lines = text?.replace(/\r/, "").split(compact ? /\n+/g : /\n/g);

  const { isMobile } = useCheckMobile(991);

  const removeLineBreak = (isMobile && removeLineBreakOnMobile) || noLineBreak;

  return (
    <>
      {lines?.map((line, index) => {
        switch (mode) {
          case Mode.Break:
            return (
              <Fragment key={index}>
                {index > 0 && !removeLineBreak && <br />}
                {wrap ? <span>{line}</span> : line}
              </Fragment>
            );
          case Mode.Space:
            return (
              <Fragment key={index}>
                {index > 0 && !removeLineBreak && <span>&nbsp;</span>}
                {wrap ? <span>{line}</span> : line}
              </Fragment>
            );
          case Mode.Paragraph:
            return <p key={index}>{line}</p>;
        }
      })}
    </>
  );
};

export default Lines;
