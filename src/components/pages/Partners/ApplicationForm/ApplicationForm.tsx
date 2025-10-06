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
  customerProfile: string;
  contactName: string;
  contactEmail: string;
  contactRole: string;
  linkedinProfile: string;
  githubProfile: string;
  twitterProfile: string;
  companySize: string;
  yearsInBusiness: string;
}

interface CaseStudyData {
  painPoints: string;
  businessImpact: string;
  previousSolution: string;
  whyLangflow: string;
  architectureOverview: string;
  implementationTime: string;
  timeToValue: string;
  successMetrics: string;
  efficiencyGains: string;
  costSavings: string;
  financialImpact: string;
  customerFeedback: string;
  referenceContact: string;
  publicLink: string;
  videoUrl: string;
  caseStudyPdf: File | null;
  additionalFiles: File[] | null;
}

interface FormData {
  company: CompanyData;
  caseStudy: CaseStudyData;
  confidentiality: boolean;
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
      customerProfile: "",
      contactName: "",
      contactEmail: "",
      contactRole: "",
      linkedinProfile: "",
      githubProfile: "",
      twitterProfile: "",
      companySize: "",
      yearsInBusiness: ""
    },
    caseStudy: {
      painPoints: "",
      businessImpact: "",
      previousSolution: "",
      whyLangflow: "",
      architectureOverview: "",
      implementationTime: "",
      timeToValue: "",
      successMetrics: "",
      efficiencyGains: "",
      costSavings: "",
      financialImpact: "",
      customerFeedback: "",
      referenceContact: "",
      publicLink: "",
      videoUrl: "",
      caseStudyPdf: null,
      additionalFiles: null
    },
    confidentiality: false,
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
      if (!formData.company.companySize.trim()) {
        newErrors["company.companySize"] = "Company size is required";
      }
      if (!formData.company.yearsInBusiness.trim()) {
        newErrors["company.yearsInBusiness"] = "Years in business is required";
      }
      if (!formData.company.linkedinProfile.trim()) {
        newErrors["company.linkedinProfile"] = "LinkedIn profile is required";
      } else if (!/^https?:\/\/.+/.test(formData.company.linkedinProfile)) {
        newErrors["company.linkedinProfile"] = "Please enter a valid LinkedIn URL";
      }
      if (formData.company.githubProfile.trim() && !/^https?:\/\/.+/.test(formData.company.githubProfile)) {
        newErrors["company.githubProfile"] = "Please enter a valid GitHub URL";
      }
      if (formData.company.twitterProfile.trim() && !/^https?:\/\/.+/.test(formData.company.twitterProfile)) {
        newErrors["company.twitterProfile"] = "Please enter a valid Twitter URL";
      }
    } else if (step === 2) {
      // Validate case study data - keeping only the most critical fields as required
      if (!formData.caseStudy.businessImpact.trim()) {
        newErrors["caseStudy.businessImpact"] = "Business impact is required";
      }
      if (!formData.caseStudy.whyLangflow.trim()) {
        newErrors["caseStudy.whyLangflow"] = "Why Langflow is required";
      }
      if (!formData.caseStudy.architectureOverview.trim()) {
        newErrors["caseStudy.architectureOverview"] = "Architecture overview is required";
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
      
      // Validate video URL format if provided
      if (formData.caseStudy.videoUrl.trim() && !formData.caseStudy.videoUrl.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/)) {
        newErrors["caseStudy.videoUrl"] = "Please enter a valid URL";
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
    const files = e.target.files;
    const fieldName = e.target.name;
    
    if (fieldName === 'caseStudy.caseStudyPdf') {
      const file = files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, caseStudyPdf: file }
      }));
      
      // Track PDF upload
      if (file) {
        trackUploadPdf(file.size);
      }
    } else if (fieldName === 'caseStudy.additionalFiles') {
      const fileList = files ? Array.from(files) : null;
      setFormData(prev => ({
        ...prev,
        caseStudy: { ...prev.caseStudy, additionalFiles: fileList }
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
        if (key !== 'caseStudyPdf' && key !== 'additionalFiles') {
          formDataToSend.append(`caseStudy.${key}`, value);
        }
      });
      
      // Add files
      if (formData.caseStudy.caseStudyPdf) {
        formDataToSend.append("caseStudy.caseStudyPdf", formData.caseStudy.caseStudyPdf);
      }
      if (formData.caseStudy.additionalFiles) {
        formData.caseStudy.additionalFiles.forEach((file, index) => {
          formDataToSend.append(`caseStudy.additionalFiles.${index}`, file);
        });
      }
      
      // Add checkboxes
      formDataToSend.append("confidentiality", formData.confidentiality.toString());
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
            customerProfile: "",
            contactName: "",
            contactEmail: "",
            contactRole: "",
            linkedinProfile: "",
            githubProfile: "",
            twitterProfile: "",
            companySize: "",
            yearsInBusiness: ""
          },
          caseStudy: {
            painPoints: "",
            businessImpact: "",
            previousSolution: "",
            whyLangflow: "",
            architectureOverview: "",
            implementationTime: "",
            timeToValue: "",
            successMetrics: "",
            efficiencyGains: "",
            costSavings: "",
            financialImpact: "",
            customerFeedback: "",
            referenceContact: "",
            publicLink: "",
            caseStudyPdf: null,
            additionalFiles: null,
            videoUrl: ""
          },
          confidentiality: false,
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
              • You'll receive an approval by email within 10 business days<br/>
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

      {/* First row - Company Basic Info */}
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
          <label htmlFor="company.companySize" className={styles.label}>
            Company Size *
          </label>
          <input
            type="text"
            id="company.companySize"
            name="company.companySize"
            value={formData.company.companySize}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.companySize"] ? styles.inputError : ""}`}
            placeholder="e.g., 1-10, 11-50, 51-200, 201-500, 500+"
            aria-describedby={errors["company.companySize"] ? "company-companySize-error" : undefined}
          />
          {errors["company.companySize"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-companySize-error">
              {errors["company.companySize"]}
            </Text>
          )}
        </div>
      </div>

      {/* Second row - Contact Info */}
      <div className={styles.formGrid}>
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

        <div className={styles.formGroup}>
          <label htmlFor="company.yearsInBusiness" className={styles.label}>
            Years in Business *
          </label>
          <input
            type="text"
            id="company.yearsInBusiness"
            name="company.yearsInBusiness"
            value={formData.company.yearsInBusiness}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.yearsInBusiness"] ? styles.inputError : ""}`}
            placeholder="e.g., 2 years, 5+ years"
            aria-describedby={errors["company.yearsInBusiness"] ? "company-yearsInBusiness-error" : undefined}
          />
          {errors["company.yearsInBusiness"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-yearsInBusiness-error">
              {errors["company.yearsInBusiness"]}
            </Text>
          )}
        </div>
      </div>

      {/* Third row - Social Media Profiles */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="company.linkedinProfile" className={styles.label}>
            LinkedIn Profile *
          </label>
          <input
            type="url"
            id="company.linkedinProfile"
            name="company.linkedinProfile"
            value={formData.company.linkedinProfile}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.linkedinProfile"] ? styles.inputError : ""}`}
            placeholder="https://linkedin.com/company/your-company"
            aria-describedby={errors["company.linkedinProfile"] ? "company-linkedinProfile-error" : undefined}
          />
          {errors["company.linkedinProfile"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-linkedinProfile-error">
              {errors["company.linkedinProfile"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.githubProfile" className={styles.label}>
            GitHub Profile
          </label>
          <input
            type="url"
            id="company.githubProfile"
            name="company.githubProfile"
            value={formData.company.githubProfile}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.githubProfile"] ? styles.inputError : ""}`}
            placeholder="https://github.com/your-company"
            aria-describedby={errors["company.githubProfile"] ? "company-githubProfile-error" : undefined}
          />
          {errors["company.githubProfile"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-githubProfile-error">
              {errors["company.githubProfile"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company.twitterProfile" className={styles.label}>
            Twitter/X Profile
          </label>
          <input
            type="url"
            id="company.twitterProfile"
            name="company.twitterProfile"
            value={formData.company.twitterProfile}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["company.twitterProfile"] ? styles.inputError : ""}`}
            placeholder="https://twitter.com/your-company"
            aria-describedby={errors["company.twitterProfile"] ? "company-twitterProfile-error" : undefined}
          />
          {errors["company.twitterProfile"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="company-twitterProfile-error">
              {errors["company.twitterProfile"]}
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
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <Text size={500} weight={Weight.Semibold} className={styles.stepTitle}>
          Step 2: Technical Flow Description
        </Text>
        <Text size={300} weight={Weight.Regular} className={styles.stepDescription}>
          Share technical details about your Langflow implementation
        </Text>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Technical Documentation PDF *
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
        <label htmlFor="caseStudy.painPoints" className={styles.label}>
          Pain Points and Challenges *
        </label>
        <textarea
          id="caseStudy.painPoints"
          name="caseStudy.painPoints"
          value={formData.caseStudy.painPoints}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.painPoints"] ? styles.inputError : ""}`}
          placeholder="What specific pain points and challenges did your client/organization face before implementing Langflow?"
          rows={4}
          aria-describedby={errors["caseStudy.painPoints"] ? "caseStudy-painPoints-error" : undefined}
        />
        {errors["caseStudy.painPoints"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-painPoints-error">
            {errors["caseStudy.painPoints"]}
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
          placeholder="Describe your technical architecture, how Langflow integrates, and any custom components or adaptations"
          rows={4}
          aria-describedby={errors["caseStudy.architectureOverview"] ? "caseStudy-architectureOverview-error" : undefined}
        />
        {errors["caseStudy.architectureOverview"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-architectureOverview-error">
            {errors["caseStudy.architectureOverview"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.businessImpact" className={styles.label}>
          Business Impact *
        </label>
        <textarea
          id="caseStudy.businessImpact"
          name="caseStudy.businessImpact"
          value={formData.caseStudy.businessImpact}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.businessImpact"] ? styles.inputError : ""}`}
          placeholder="How did these challenges affect business operations, productivity, or customer satisfaction?"
          rows={4}
          aria-describedby={errors["caseStudy.businessImpact"] ? "caseStudy-businessImpact-error" : undefined}
        />
        {errors["caseStudy.businessImpact"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-businessImpact-error">
            {errors["caseStudy.businessImpact"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.previousSolution" className={styles.label}>
          Previous Solution *
        </label>
        <textarea
          id="caseStudy.previousSolution"
          name="caseStudy.previousSolution"
          value={formData.caseStudy.previousSolution}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.previousSolution"] ? styles.inputError : ""}`}
          placeholder="What solutions were tried before Langflow? What were their limitations?"
          rows={3}
          aria-describedby={errors["caseStudy.previousSolution"] ? "caseStudy-previousSolution-error" : undefined}
        />
        {errors["caseStudy.previousSolution"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-previousSolution-error">
            {errors["caseStudy.previousSolution"]}
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
          placeholder="What made Langflow the right choice? What key features or capabilities were decisive?"
          rows={3}
          aria-describedby={errors["caseStudy.whyLangflow"] ? "caseStudy-whyLangflow-error" : undefined}
        />
        {errors["caseStudy.whyLangflow"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-whyLangflow-error">
            {errors["caseStudy.whyLangflow"]}
          </Text>
        )}
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.implementationTime" className={styles.label}>
            Implementation Time *
          </label>
          <input
            type="text"
            id="caseStudy.implementationTime"
            name="caseStudy.implementationTime"
            value={formData.caseStudy.implementationTime}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["caseStudy.implementationTime"] ? styles.inputError : ""}`}
            placeholder="How long did it take to implement? e.g., 2 weeks"
            aria-describedby={errors["caseStudy.implementationTime"] ? "caseStudy-implementationTime-error" : undefined}
          />
          {errors["caseStudy.implementationTime"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-implementationTime-error">
              {errors["caseStudy.implementationTime"]}
            </Text>
          )}
        </div>

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
            placeholder="When did you start seeing results? e.g., 1 month"
            aria-describedby={errors["caseStudy.timeToValue"] ? "caseStudy-timeToValue-error" : undefined}
          />
          {errors["caseStudy.timeToValue"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-timeToValue-error">
              {errors["caseStudy.timeToValue"]}
            </Text>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.efficiencyGains" className={styles.label}>
            Efficiency Gains *
          </label>
          <input
            type="text"
            id="caseStudy.efficiencyGains"
            name="caseStudy.efficiencyGains"
            value={formData.caseStudy.efficiencyGains}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["caseStudy.efficiencyGains"] ? styles.inputError : ""}`}
            placeholder="e.g., 50% faster processing, 3x throughput"
            aria-describedby={errors["caseStudy.efficiencyGains"] ? "caseStudy-efficiencyGains-error" : undefined}
          />
          {errors["caseStudy.efficiencyGains"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-efficiencyGains-error">
              {errors["caseStudy.efficiencyGains"]}
            </Text>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="caseStudy.costSavings" className={styles.label}>
            Cost Savings *
          </label>
          <input
            type="text"
            id="caseStudy.costSavings"
            name="caseStudy.costSavings"
            value={formData.caseStudy.costSavings}
            onChange={handleInputChange}
            className={`${styles.input} ${errors["caseStudy.costSavings"] ? styles.inputError : ""}`}
            placeholder="e.g., 30% reduction in operational costs"
            aria-describedby={errors["caseStudy.costSavings"] ? "caseStudy-costSavings-error" : undefined}
          />
          {errors["caseStudy.costSavings"] && (
            <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-costSavings-error">
              {errors["caseStudy.costSavings"]}
            </Text>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.successMetrics" className={styles.label}>
          Success Metrics *
        </label>
        <textarea
          id="caseStudy.successMetrics"
          name="caseStudy.successMetrics"
          value={formData.caseStudy.successMetrics}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.successMetrics"] ? styles.inputError : ""}`}
          placeholder="What KPIs improved? Include specific metrics and improvements (e.g., customer satisfaction up 40%, response time reduced by 60%)"
          rows={3}
          aria-describedby={errors["caseStudy.successMetrics"] ? "caseStudy-successMetrics-error" : undefined}
        />
        {errors["caseStudy.successMetrics"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-successMetrics-error">
            {errors["caseStudy.successMetrics"]}
          </Text>
        )}
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
          placeholder="What was the overall financial impact? Include ROI, revenue increase, or cost savings in actual numbers when possible"
          rows={3}
          aria-describedby={errors["caseStudy.financialImpact"] ? "caseStudy-financialImpact-error" : undefined}
        />
        {errors["caseStudy.financialImpact"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-financialImpact-error">
            {errors["caseStudy.financialImpact"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="caseStudy.customerFeedback" className={styles.label}>
          Customer Feedback *
        </label>
        <textarea
          id="caseStudy.customerFeedback"
          name="caseStudy.customerFeedback"
          value={formData.caseStudy.customerFeedback}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors["caseStudy.customerFeedback"] ? styles.inputError : ""}`}
          placeholder="Share specific feedback from users or stakeholders about the impact of Langflow"
          rows={3}
          aria-describedby={errors["caseStudy.customerFeedback"] ? "caseStudy-customerFeedback-error" : undefined}
        />
        {errors["caseStudy.customerFeedback"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-customerFeedback-error">
            {errors["caseStudy.customerFeedback"]}
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
        <label htmlFor="caseStudy.videoUrl" className={styles.label}>
          Demo Video URL
        </label>
        <input
          type="url"
          id="caseStudy.videoUrl"
          name="caseStudy.videoUrl"
          value={formData.caseStudy.videoUrl}
          onChange={handleInputChange}
          className={`${styles.input} ${errors["caseStudy.videoUrl"] ? styles.inputError : ""}`}
          placeholder="Link to your demo video (optional)"
        />
        {errors["caseStudy.videoUrl"] && (
          <Text size={200} weight={Weight.Regular} className={styles.fieldError} id="caseStudy-videoUrl-error">
            {errors["caseStudy.videoUrl"]}
          </Text>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Additional Files
        </label>
        <div
          className={`${styles.fileUpload} ${dragActive ? styles.fileUploadActive : ""}`}
          onClick={() => document.getElementById('additionalFiles')?.click()}
        >
          <input
            type="file"
            id="additionalFiles"
            name="caseStudy.additionalFiles"
            onChange={handleFileChange}
            className={styles.fileInput}
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.json,.yaml,.yml,.txt"
          />
          <div className={styles.fileUploadContent}>
            <Text size={400} weight={Weight.Semibold} className={styles.fileUploadText}>
              {formData.caseStudy.additionalFiles?.length 
                ? `${formData.caseStudy.additionalFiles.length} file(s) selected` 
                : "Drop additional files here or click to browse"}
            </Text>
            <Text size={200} weight={Weight.Regular} className={styles.helpText}>
              Upload any relevant files: project files, flows, results, sheets, etc.
            </Text>
          </div>
        </div>
      </div>


      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="confidentiality"
            checked={formData.confidentiality}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
            required
          />
          <span className={styles.checkboxText}>
            I confirm that I am voluntarily applying to the Langflow Partner Certification Program and consent to the processing of my personal and business information, including the use case submitted, for evaluation purposes.
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
            I understand that all information will be kept confidential during the review process and, if I am approved, Langflow may publicly share selected content from my submission to showcase my certified status.
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

