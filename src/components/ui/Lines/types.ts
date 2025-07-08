// Types

/**
 * The available modes.
 */
export enum Mode {
  /**
   * With this mode the lines are broken using paragraphs, each line being wrapped in a `<p>` element.
   */
  Paragraph = "p",
  /**
   * With this mode the lines are broken using simple line breaks, `<br>` element.
   */
  Break = "br",

  Space = "space",
}
