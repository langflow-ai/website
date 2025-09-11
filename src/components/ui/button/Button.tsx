import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
} from "react";
import styles from "./styles.module.scss"; // Import SCSS styles
import { ButtonTypes } from "./types"; // Import enum

interface ButtonProps {
  variant: ButtonTypes;
  children: React.ReactNode;
  onClick?: () => void; // Optional for server rendering
  icon?: React.ReactNode; // Accept an icon as a prop
  href?: string;
}

type AllowedHTMLAttributes = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<AllowedHTMLAttributes & ButtonProps> = ({
  className,
  variant = ButtonTypes.FILLED,
  children,
  onClick,
  icon,
  ...props
}) => {
  // Dynamically set the class name for the button
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;
  const Element: ElementType = !!props.href ? "a" : "button";

  return (
    <Element className={buttonClass} onClick={onClick} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Element>
  );
};

export default Button;
