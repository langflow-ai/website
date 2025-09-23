"use client";

import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";

interface FormData {
  name: string;
  email: string;
  company: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
  file?: string;
  general?: string;
}

const ApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    description: "",
    file: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFileSize = parseInt(process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100") * 1024 * 1024; // Convert to bytes

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.length < 200) {
      newErrors.description = "Description must be at least 200 characters";
    } else if (formData.description.length > 1500) {
      newErrors.description = "Description must be less than 1500 characters";
    }

    if (!formData.file) {
      newErrors.file = "Project file is required";
    } else if (formData.file.type !== "application/zip") {
      newErrors.file = "Please upload a .zip file";
    } else if (formData.file.size > maxFileSize) {
      newErrors.file = `File size must be less than ${process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100"}MB`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
    
    if (errors.file) {
      setErrors(prev => ({ ...prev, file: undefined }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, file }));
      
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("description", formData.description);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch("/api/partners/apply", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form except email
        setFormData(prev => ({
          name: "",
          email: prev.email, // Keep email
          company: "",
          description: "",
          file: null
        }));
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply" className={styles.formSection}>
        <div className={`${styles.container} container-wide`}>
          <div className={styles.successMessage}>
            <Text size={600} weight={Weight.Bold} className={styles.successTitle}>
              Application Received!
            </Text>
            <Text size={400} weight={Weight.Regular} className={styles.successDescription}>
              Thank you for your interest in becoming a Langflow partner. We've received your application 
              and will review it within 5-7 business days. You'll receive an email notification once 
              your application has been processed.
            </Text>
            <Button
              variant={ButtonTypes.FILLED}
              onClick={() => setIsSubmitted(false)}
              data-attr="partners-form-apply-again"
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className={styles.formSection}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.header}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            Apply to Become a Partner
          </Text>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Fill out the form below to apply for our partner program. All fields marked with * are required.
          </Text>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.general && (
            <div className={styles.errorMessage} role="alert">
              <Text size={300} weight={Weight.Regular}>
                {errors.general}
              </Text>
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                placeholder="Your full name"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="name-error">
                  {errors.name}
                </Text>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                placeholder="your.email@company.com"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="email-error">
                  {errors.email}
                </Text>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.label}>
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your company name (optional)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              placeholder="Describe your Langflow project in detail. Include the problem you solved, how you used Langflow, and the results achieved. (200-1500 characters)"
              rows={6}
              aria-describedby={errors.description ? "description-error" : "description-help"}
            />
            <div className={styles.characterCount}>
              <Text size={200} weight={Weight.Regular}>
                {formData.description.length}/1500 characters
              </Text>
            </div>
            {errors.description && (
              <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="description-error">
                {errors.description}
              </Text>
            )}
            <Text size={200} weight={Weight.Regular} className={styles.helpText} id="description-help">
              Minimum 200 characters required
            </Text>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Project File *
            </label>
            <div
              className={`${styles.fileUpload} ${dragActive ? styles.fileUploadActive : ""} ${errors.file ? styles.fileUploadError : ""}`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className={styles.fileInput}
                aria-describedby={errors.file ? "file-error" : "file-help"}
              />
              <div className={styles.fileUploadContent}>
                <Text size={400} weight={Weight.Semibold} className={styles.fileUploadText}>
                  {formData.file ? formData.file.name : "Drop your project .zip file here or click to browse"}
                </Text>
                {/* <Text size={300} weight={Weight.Regular} className={styles.fileUploadSubtext}>
                  Maximum size: {process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100"}MB
                </Text> */}
              </div>
            </div>
            {errors.file && (
              <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="file-error">
                {errors.file}
              </Text>
            )}
            <Text size={200} weight={Weight.Regular} className={styles.helpText} id="file-help">
              Please include your Langflow flows, documentation, and any relevant code
            </Text>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                required
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                I agree to be contacted and to the processing of the submitted materials for partner evaluation. *
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant={ButtonTypes.FILLED}
            disabled={isSubmitting}
            className={styles.submitButton}
            data-attr="partners-form-submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
