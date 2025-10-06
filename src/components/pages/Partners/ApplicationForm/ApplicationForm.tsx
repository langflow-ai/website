"use client";

import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { trackFormProgress, trackFormSubmit, trackStartApplication, trackUploadPdf } from "@/lib/utils/analytics";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface CompanyData {
  name: string;
  website: string;
  country: string;
  industry: string;
  customerProfile: string;
  contactName: string;
  contactEmail: string;
  contactRole: string;
}

interface CaseStudyData {
  problemSolved: string;
  whyLangflow: string;
  architectureOverview: string;
  timeToValue: string;
  successMetrics: string;
  financialImpact: string;
  referenceContact: string;
  publicLink: string;
  caseStudyPdf: File | null;
  optionalAttachments: File | null;
}

interface FormData {
  company: CompanyData;
  caseStudy: CaseStudyData;
  confidentiality: boolean;
  ndaRequest: boolean;
  consentToContact: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface ApplicationFormProps {
  onSubmitted?: () => void;
  isModal?: boolean;
}

const ApplicationForm = ({ onSubmitted, isModal = false }: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    company: {
      name: "",
      website: "",
      country: "",
      industry: "",
      customerProfile: "",
      contactName: "",
      contactEmail: "",
      contactRole: ""
    },
    caseStudy: {
      problemSolved: "",
      whyLangflow: "",
      architectureOverview: "",
      timeToValue: "",
      successMetrics: "",
      financialImpact: "",
      referenceContact: "",
      publicLink: "",
      caseStudyPdf: null,
      optionalAttachments: null
    },
    confidentiality: false,
    ndaRequest: false,
    consentToContact: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFileSize = parseInt(process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100") * 1024 * 1024; // Convert to bytes

  // Track when user starts the application
  useEffect(() => {
    trackStartApplication();
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // Validate company data
      if (!formData.company.name.trim()) {
        newErrors["company.name"] = "Company name is required";
      }
      if (!formData.company.website.trim()) {
        newErrors["company.website"] = "Website is required";
      } else if (!/^https?:\/\/.+/.test(formData.company.website)) {
        newErrors["company.website"] = "Please enter a valid website URL";
      }
      if (!formData.company.country.trim()) {
        newErrors["company.country"] = "Country is required";
      }
      if (!formData.company.industry.trim()) {
        newErrors["company.industry"] = "Industry is required";
      }
      if (!formData.company.customerProfile.trim()) {
        newErrors["company.customerProfile"] = "Customer profile is required";
      }
      if (!formData.company.contactName.trim()) {
        newErrors["company.contactName"] = "Contact name is required";
      }
      if (!formData.company.contactEmail.trim()) {
        newErrors["company.contactEmail"] = "Contact email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.company.contactEmail)) {
        newErrors["company.contactEmail"] = "Please enter a valid email address";
      }
      if (!formData.company.contactRole.trim()) {
        newErrors["company.contactRole"] = "Contact role is required";
      }
    } else if (step === 2) {
      // Validate case study data
      if (!formData.caseStudy.problemSolved.trim()) {
        newErrors["caseStudy.problemSolved"] = "Problem solved is required";
      }
      if (!formData.caseStudy.whyLangflow.trim()) {
        newErrors["caseStudy.whyLangflow"] = "Why Langflow is required";
      }
      if (!formData.caseStudy.architectureOverview.trim()) {
        newErrors["caseStudy.architectureOverview"] = "Architecture overview is required";
      }
      if (!formData.caseStudy.timeToValue.trim()) {
        newErrors["caseStudy.timeToValue"] = "Time to value is required";
      }
      if (!formData.caseStudy.successMetrics.trim()) {
        newErrors["caseStudy.successMetrics"] = "Success metrics are required";
      }
      if (!formData.caseStudy.financialImpact.trim()) {
        newErrors["caseStudy.financialImpact"] = "Financial impact is required";
      }
      if (!formData.caseStudy.caseStudyPdf) {
        newErrors["caseStudy.caseStudyPdf"] = "Case Study PDF is required";
      } else if (formData.caseStudy.caseStudyPdf.type !== "application/pdf") {
        newErrors["caseStudy.caseStudyPdf"] = "Please upload a PDF file";
      } else if (formData.caseStudy.caseStudyPdf.size > maxFileSize) {
        newErrors["caseStudy.caseStudyPdf"] = `File size must be less than ${process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100"}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    
    if (section === 'company') {
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, [field]: value }
      }));
    } else if (section === 'caseStudy') {
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const fieldName = e.target.name;
    
    if (fieldName === 'caseStudy.caseStudyPdf') {
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, caseStudyPdf: file }
      }));
      
      // Track PDF upload
      if (file) {
        trackUploadPdf(file.size);
      }
    } else if (fieldName === 'caseStudy.optionalAttachments') {
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, optionalAttachments: file }
      }));
    }
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
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
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, caseStudyPdf: file }
      }));
      
      if (errors["caseStudy.caseStudyPdf"]) {
        setErrors(prev => ({ ...prev, ["caseStudy.caseStudyPdf"]: undefined }));
      }
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      trackFormProgress(currentStep + 1, 2);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(2)) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        element?.focus();
      }
      return;
    }

    if (!formData.consentToContact) {
      setErrors({ general: "You must consent to be contacted to submit the application." });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      
      // Add company data
      Object.entries(formData.company).forEach(([key, value]) => {
        formDataToSend.append(`company.${key}`, value);
      });
      
      // Add case study data (excluding files)
      Object.entries(formData.caseStudy).forEach(([key, value]) => {
        if (key !== 'caseStudyPdf' && key !== 'optionalAttachments') {
          formDataToSend.append(`caseStudy.${key}`, value);
        }
      });
      
      // Add files
      if (formData.caseStudy.caseStudyPdf) {
        formDataToSend.append("caseStudy.caseStudyPdf", formData.caseStudy.caseStudyPdf);
      }
      if (formData.caseStudy.optionalAttachments) {
        formDataToSend.append("caseStudy.optionalAttachments", formData.caseStudy.optionalAttachments);
      }
      
      // Add checkboxes
      formDataToSend.append("confidentiality", formData.confidentiality.toString());
      formDataToSend.append("ndaRequest", formData.ndaRequest.toString());
      formDataToSend.append("consentToContact", formData.consentToContact.toString());

      const response = await fetch("/api/partners/apply", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        trackFormSubmit(true, currentStep);
        setIsSubmitted(true);
        onSubmitted?.();
        // Reset form
        setFormData({
          company: {
            name: "",
            website: "",
            country: "",
            industry: "",
            customerProfile: "",
            contactName: "",
            contactEmail: "",
            contactRole: ""
          },
          caseStudy: {
            problemSolved: "",
            whyLangflow: "",
            architectureOverview: "",
            timeToValue: "",
            successMetrics: "",
            financialImpact: "",
            referenceContact: "",
            publicLink: "",
            caseStudyPdf: null,
            optionalAttachments: null
          },
          confidentiality: false,
          ndaRequest: false,
          consentToContact: false
        });
        setCurrentStep(1);
      } else {
        trackFormSubmit(false, currentStep);
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
    const content = (
      <div className={styles.successMessage}>
            <Text size={600} weight={Weight.Bold} className={styles.successTitle}>
              Application Received!
            </Text>
            <Text size={400} weight={Weight.Regular} className={styles.successDescription}>
              Thank you for your interest in becoming a Langflow partner. We've received your application 
              and will review it within 10 business days. You'll receive an email notification once 
              your application has been processed.
            </Text>
            <Text size={300} weight={Weight.Regular} className={styles.timelineInfo}>
              <strong>What happens next:</strong><br/>
              • You'll receive a decision by email within 10 business days<br/>
              • If approved, we'll publish your profile, share the badge kit, and occasionally invite you to spotlights and qualified customer introductions
            </Text>
            <Button
              variant={ButtonTypes.FILLED}
              onClick={() => setIsSubmitted(false)}
              data-attr="partners-form-apply-again"
            >
              Submit Another Application
            </Button>
          </div>
    );

    if (isModal) {
      return content;
    }

    return (
      <section id="apply" className={styles.formSection}>
        <div className={`${styles.container} container-wide`}>
          {content}
        </div>
      </section>
    );
  }

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <Text size={500} weight={Weight.Semibold} className={styles.stepTitle}>
          Step 1: Company Information
        </Text>
        <Text size={300} weight={Weight.Regular} className={styles.stepDescription}>
          Tell us about your company and primary contact
        </Text>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="company.name" className={styles.label}>
            Company Name *
          </label>
          <input
            type="text"
            id="company.name"
            name="company.name"
            value={formData.company.name}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.name"] ? styles.inputError : ""}`}
            placeholder="Your company name"
            aria-describedby={errors["company.name"] ? "company-name-error" : undefined}
          />
          {errors["company.name"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-name-error">
              {errors["company.name"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.website" className={styles.label}>
            Website *
          </label>
          <input
            type="url"
            id="company.website"
            name="company.website"
            value={formData.company.website}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.website"] ? styles.inputError : ""}`}
            placeholder="https://yourcompany.com"
            aria-describedby={errors["company.website"] ? "company-website-error" : undefined}
          />
          {errors["company.website"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-website-error">
              {errors["company.website"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.country" className={styles.label}>
            Country *
          </label>
          <input
            type="text"
            id="company.country"
            name="company.country"
            value={formData.company.country}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.country"] ? styles.inputError : ""}`}
            placeholder="United States"
            aria-describedby={errors["company.country"] ? "company-country-error" : undefined}
          />
          {errors["company.country"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-country-error">
              {errors["company.country"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.industry" className={styles.label}>
            Industry *
          </label>
          <input
            type="text"
            id="company.industry"
            name="company.industry"
            value={formData.company.industry}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.industry"] ? styles.inputError : ""}`}
            placeholder="Technology, Healthcare, Finance, etc."
            aria-describedby={errors["company.industry"] ? "company-industry-error" : undefined}
          />
          {errors["company.industry"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-industry-error">
              {errors["company.industry"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.customerProfile" className={styles.label}>
            Customer Profile *
          </label>
          <textarea
            id="company.customerProfile"
            name="company.customerProfile"
            value={formData.company.customerProfile}
            onChange={handleInputChange}
            className={`${styles.textarea} ${errors["company.customerProfile"] ? styles.inputError : ""}`}
            placeholder="Describe your typical customers and their needs"
            rows={3}
            aria-describedby={errors["company.customerProfile"] ? "company-customerProfile-error" : undefined}
          />
          {errors["company.customerProfile"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-customerProfile-error">
              {errors["company.customerProfile"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.contactName" className={styles.label}>
            Contact Name *
          </label>
          <input
            type="text"
            id="company.contactName"
            name="company.contactName"
            value={formData.company.contactName}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.contactName"] ? styles.inputError : ""}`}
            placeholder="John Doe"
            aria-describedby={errors["company.contactName"] ? "company-contactName-error" : undefined}
          />
          {errors["company.contactName"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-contactName-error">
              {errors["company.contactName"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.contactEmail" className={styles.label}>
            Contact Email *
          </label>
          <input
            type="email"
            id="company.contactEmail"
            name="company.contactEmail"
            value={formData.company.contactEmail}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.contactEmail"] ? styles.inputError : ""}`}
            placeholder="john@company.com"
            aria-describedby={errors["company.contactEmail"] ? "company-contactEmail-error" : undefined}
          />
          {errors["company.contactEmail"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-contactEmail-error">
              {errors["company.contactEmail"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.contactRole" className={styles.label}>
            Contact Role *
          </label>
          <input
            type="text"
            id="company.contactRole"
            name="company.contactRole"
            value={formData.company.contactRole}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.contactRole"] ? styles.inputError : ""}`}
            placeholder="CEO, CTO, Partner Manager, etc."
            aria-describedby={errors["company.contactRole"] ? "company-contactRole-error" : undefined}
          />
          {errors["company.contactRole"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-contactRole-error">
              {errors["company.contactRole"]}
            </Text>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <Text size={500} weight={Weight.Semibold} className={styles.stepTitle}>
          Step 2: Case Study
        </Text>
        <Text size={300} weight={Weight.Regular} className={styles.stepDescription}>
          Share details about your Langflow implementation
        </Text>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.problemSolved" className={styles.label}>
          Problem Solved *
        </label>
        <textarea
          id="caseStudy.problemSolved"
          name="caseStudy.problemSolved"
          value={formData.caseStudy.problemSolved}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.problemSolved"] ? styles.inputError : ""}`}
          placeholder="Describe the business problem or challenge you solved using Langflow"
          rows={4}
          aria-describedby={errors["caseStudy.problemSolved"] ? "caseStudy-problemSolved-error" : undefined}
        />
        {errors["caseStudy.problemSolved"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-problemSolved-error">
            {errors["caseStudy.problemSolved"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.whyLangflow" className={styles.label}>
          Why Langflow? *
        </label>
        <textarea
          id="caseStudy.whyLangflow"
          name="caseStudy.whyLangflow"
          value={formData.caseStudy.whyLangflow}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.whyLangflow"] ? styles.inputError : ""}`}
          placeholder="Explain why you chose Langflow over other solutions"
          rows={3}
          aria-describedby={errors["caseStudy.whyLangflow"] ? "caseStudy-whyLangflow-error" : undefined}
        />
        {errors["caseStudy.whyLangflow"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-whyLangflow-error">
            {errors["caseStudy.whyLangflow"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.architectureOverview" className={styles.label}>
          Architecture Overview *
        </label>
        <textarea
          id="caseStudy.architectureOverview"
          name="caseStudy.architectureOverview"
          value={formData.caseStudy.architectureOverview}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.architectureOverview"] ? styles.inputError : ""}`}
          placeholder="Describe your technical architecture and how Langflow fits in"
          rows={4}
          aria-describedby={errors["caseStudy.architectureOverview"] ? "caseStudy-architectureOverview-error" : undefined}
        />
        {errors["caseStudy.architectureOverview"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-architectureOverview-error">
            {errors["caseStudy.architectureOverview"]}
          </Text>
        )}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.timeToValue" className={styles.label}>
            Time to Value *
          </label>
          <input
            type="text"
            id="caseStudy.timeToValue"
            name="caseStudy.timeToValue"
            value={formData.caseStudy.timeToValue}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["caseStudy.timeToValue"] ? styles.inputError : ""}`}
            placeholder="2 weeks, 1 month, etc."
            aria-describedby={errors["caseStudy.timeToValue"] ? "caseStudy-timeToValue-error" : undefined}
          />
          {errors["caseStudy.timeToValue"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-timeToValue-error">
              {errors["caseStudy.timeToValue"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.successMetrics" className={styles.label}>
            Success Metrics *
          </label>
          <input
            type="text"
            id="caseStudy.successMetrics"
            name="caseStudy.successMetrics"
            value={formData.caseStudy.successMetrics}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["caseStudy.successMetrics"] ? styles.inputError : ""}`}
            placeholder="50% efficiency gain, 30% cost reduction, etc."
            aria-describedby={errors["caseStudy.successMetrics"] ? "caseStudy-successMetrics-error" : undefined}
          />
          {errors["caseStudy.successMetrics"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-successMetrics-error">
              {errors["caseStudy.successMetrics"]}
            </Text>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.financialImpact" className={styles.label}>
          Financial Impact *
        </label>
        <textarea
          id="caseStudy.financialImpact"
          name="caseStudy.financialImpact"
          value={formData.caseStudy.financialImpact}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.financialImpact"] ? styles.inputError : ""}`}
          placeholder="Describe the financial impact and ROI of your Langflow implementation"
          rows={3}
          aria-describedby={errors["caseStudy.financialImpact"] ? "caseStudy-financialImpact-error" : undefined}
        />
        {errors["caseStudy.financialImpact"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-financialImpact-error">
            {errors["caseStudy.financialImpact"]}
          </Text>
        )}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.referenceContact" className={styles.label}>
            Reference Contact
          </label>
          <input
            type="text"
            id="caseStudy.referenceContact"
            name="caseStudy.referenceContact"
            value={formData.caseStudy.referenceContact}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Customer contact for reference (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.publicLink" className={styles.label}>
            Public Link
          </label>
          <input
            type="url"
            id="caseStudy.publicLink"
            name="caseStudy.publicLink"
            value={formData.caseStudy.publicLink}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="https://example.com/case-study (optional)"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Case Study PDF *
        </label>
        <div
          className={`${styles.fileUpload} ${dragActive ? styles.fileUploadActive : ""} ${errors["caseStudy.caseStudyPdf"] ? styles.fileUploadError : ""}`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="caseStudy.caseStudyPdf"
            accept=".pdf"
            onChange={handleFileChange}
            className={styles.fileInput}
            aria-describedby={errors["caseStudy.caseStudyPdf"] ? "caseStudy-caseStudyPdf-error" : "caseStudy-caseStudyPdf-help"}
          />
          <div className={styles.fileUploadContent}>
            <Text size={400} weight={Weight.Semibold} className={styles.fileUploadText}>
              {formData.caseStudy.caseStudyPdf ? formData.caseStudy.caseStudyPdf.name : "Drop your case study PDF here or click to browse"}
            </Text>
          </div>
        </div>
        {errors["caseStudy.caseStudyPdf"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-caseStudyPdf-error">
            {errors["caseStudy.caseStudyPdf"]}
          </Text>
        )}
        <Text size={200} weight={Weight.Regular} className={styles.helpText} id="caseStudy-caseStudyPdf-help">
          Please upload a detailed case study PDF (max {process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100"}MB)
        </Text>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Optional Attachments
        </label>
        <input
          type="file"
          name="caseStudy.optionalAttachments"
          onChange={handleFileChange}
          className={styles.input}
          multiple
        />
        <Text size={200} weight={Weight.Regular} className={styles.helpText}>
          Additional files, screenshots, or documentation (optional)
        </Text>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="confidentiality"
            checked={formData.confidentiality}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>
            I understand this information may be kept confidential
          </span>
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="ndaRequest"
            checked={formData.ndaRequest}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>
            I request an NDA before sharing sensitive information
          </span>
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="consentToContact"
            checked={formData.consentToContact}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
            required
          />
          <span className={styles.checkboxText}>
            I consent to be contacted regarding this application *
          </span>
        </label>
      </div>
    </div>
  );

  const formContent = (
    <>

      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : ""}`}>
          <div className={styles.stepNumber}>1</div>
          <Text size={300} weight={Weight.Regular}>Company</Text>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : ""}`}>
          <div className={styles.stepNumber}>2</div>
          <Text size={300} weight={Weight.Regular}>Case Study</Text>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.general && (
          <div className={styles.errorMessage} role="alert">
            <Text size={300} weight={Weight.Regular}>
              {errors.general}
            </Text>
          </div>
        )}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <Button
              type="button"
              variant={ButtonTypes.BORDER}
              onClick={prevStep}
              data-attr="partners-form-prev-step"
            >
              Previous
            </Button>
          )}
          
          {currentStep < 2 ? (
            <Button
              type="button"
              variant={ButtonTypes.FILLED}
              onClick={nextStep}
              data-attr="partners-form-next-step"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant={ButtonTypes.FILLED}
              disabled={isSubmitting}
              className={styles.submitButton}
              data-attr="partners-form-submit"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <section id="apply" className={styles.formSection}>
      <div className={`${styles.container} container-wide`}>
        {formContent}
      </div>
    </section>
  );
};

export default ApplicationForm;

