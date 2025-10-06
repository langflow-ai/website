"use client";

import { useEffect, useState } from "react";
import ApplicationForm from "../ApplicationForm/ApplicationForm";
import styles from "./styles.module.scss";

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationFormModal = ({ isOpen, onClose }: ApplicationFormModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalFormContainer}>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <ApplicationForm 
        onSubmitted={() => setIsSubmitted(true)} 
        isModal={true}
      />
    </div>
  );
};

export default ApplicationFormModal;
