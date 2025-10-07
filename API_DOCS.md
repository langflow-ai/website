# Partners API Documentation

## Authentication
The API uses Bearer token authentication. The token should be included in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Submit Partner Application
`POST /partners/apply`

Handles the submission of partner applications.

#### Request
- Content-Type: multipart/form-data

#### Form Fields

##### Company Information
- `company.name` (string, required) - Company name
- `company.website` (string, required) - Company website URL
- `company.country` (string, required) - Company's country
- `company.customerProfile` (string, required) - Description of typical customers
- `company.contactName` (string, required) - Primary contact name
- `company.contactEmail` (string, required) - Contact email address
- `company.contactRole` (string, required) - Contact's role in company
- `company.linkedinProfile` (string, required) - Company LinkedIn profile
- `company.githubProfile` (string, optional) - Company GitHub profile
- `company.twitterProfile` (string, optional) - Company Twitter/X profile
- `company.companySize` (string, required) - Number of employees
- `company.yearsInBusiness` (string, required) - Years in operation

##### Case Study Information
- `caseStudy.businessImpact` (string, required) - Business impact description
- `caseStudy.whyLangflow` (string, required) - Reason for choosing Langflow
- `caseStudy.architectureOverview` (string, required) - Technical architecture details
- `caseStudy.successMetrics` (string, required) - Success metrics and KPIs
- `caseStudy.financialImpact` (string, required) - Financial impact details
- `caseStudy.caseStudyPdf` (file, required) - Case study PDF document
- `caseStudy.videoUrl` (string, optional) - Demo video URL
- `caseStudy.additionalFiles` (array of files, optional) - Additional supporting documents

Optional fields:
- `caseStudy.painPoints` (string) - Pain points and challenges
- `caseStudy.previousSolution` (string) - Previous solution details
- `caseStudy.implementationTime` (string) - Implementation timeline
- `caseStudy.timeToValue` (string) - Time to value
- `caseStudy.efficiencyGains` (string) - Efficiency improvements
- `caseStudy.costSavings` (string) - Cost savings details
- `caseStudy.customerFeedback` (string) - Customer feedback
- `caseStudy.referenceContact` (string) - Reference contact information
- `caseStudy.publicLink` (string) - Public case study link

##### Consent Information
- `confidentiality` (boolean, required) - Agreement to confidentiality terms
- `consentToContact` (boolean, required) - Consent to be contacted

#### Response

##### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "string"
}
```

##### Error Response (400 Bad Request)
```json
{
  "error": "string",
  "details": {
    "field": "error message"
  }
}
```

## Database Schema Recommendations

### Partners Table
```sql
CREATE TABLE partners (
    id UUID PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    customer_profile TEXT NOT NULL,
    company_size VARCHAR(50) NOT NULL,
    years_in_business VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Contacts Table
```sql
CREATE TABLE partner_contacts (
    id UUID PRIMARY KEY,
    partner_id UUID REFERENCES partners(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    linkedin_profile VARCHAR(255) NOT NULL,
    github_profile VARCHAR(255),
    twitter_profile VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Case Studies Table
```sql
CREATE TABLE case_studies (
    id UUID PRIMARY KEY,
    partner_id UUID REFERENCES partners(id),
    business_impact TEXT NOT NULL,
    why_langflow TEXT NOT NULL,
    architecture_overview TEXT NOT NULL,
    success_metrics TEXT NOT NULL,
    financial_impact TEXT NOT NULL,
    pain_points TEXT,
    previous_solution TEXT,
    implementation_time VARCHAR(100),
    time_to_value VARCHAR(100),
    efficiency_gains TEXT,
    cost_savings TEXT,
    customer_feedback TEXT,
    reference_contact TEXT,
    public_link VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Files Table
```sql
CREATE TABLE partner_files (
    id UUID PRIMARY KEY,
    case_study_id UUID REFERENCES case_studies(id),
    file_type VARCHAR(50) NOT NULL, -- 'case_study_pdf' or 'additional'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Service Layer Recommendations

### Structure
```typescript
interface IPartnersService {
    submitApplication(data: PartnerApplicationData): Promise<ApplicationResult>;
    validateApplication(data: PartnerApplicationData): ValidationResult;
    processFiles(files: PartnerFiles): Promise<ProcessedFiles>;
    notifyAdmins(applicationId: string): Promise<void>;
}

interface IFileStorageService {
    uploadFile(file: File, path: string): Promise<string>;
    validateFile(file: File, allowedTypes: string[]): boolean;
}

interface INotificationService {
    sendAdminNotification(data: NotificationData): Promise<void>;
    sendApplicantConfirmation(email: string, data: ConfirmationData): Promise<void>;
}
```

### Implementation Considerations
1. Use a file storage service (like S3) for file uploads
2. Implement email notifications for admins and applicants
3. Add validation for file types and sizes
4. Implement rate limiting for submissions
5. Add logging for all operations
6. Implement error tracking and monitoring
7. Add application status tracking
8. Implement admin dashboard endpoints
