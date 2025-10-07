import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] 🚀 [NEXT.JS] Starting partner application submission...`);
  
  try {
    // Get form data from request
    console.log(`[${requestId}] 📥 [NEXT.JS] Receiving form data from frontend...`);
    const formData = await req.formData();
    console.log(`[${requestId}] ✅ [NEXT.JS] Form data parsed successfully`);
    
    // Log form data entries with detailed information
    const formEntries = Array.from(formData.entries());
    console.log(`[${requestId}] 📋 [NEXT.JS] Form data entries analysis:`, {
      totalEntries: formEntries.length,
      entries: formEntries.map(([key, value]) => ({
        key,
        value: value instanceof File 
          ? `File: ${value.name} (${value.type}, ${(value.size / (1024 * 1024)).toFixed(2)}MB)`
          : typeof value === 'string' ? (value.length > 100 ? value.substring(0, 100) + '...' : value) : value,
        type: value instanceof File ? 'File' : typeof value,
        isEmpty: value instanceof File ? false : (value === '' || value === null || value === undefined)
      }))
    });

    // Log structured data check
    const companyFields = ['name', 'website', 'country', 'customerProfile', 'contactName', 'contactEmail', 'contactRole', 'linkedinProfile', 'companySize', 'yearsInBusiness'];
    const caseStudyFields = ['businessImpact', 'whyLangflow', 'architectureOverview', 'successMetrics', 'financialImpact'];
    
    console.log(`[${requestId}] Required fields check:`, {
      company: companyFields.map(field => ({
        field: `company.${field}`,
        present: formData.has(`company.${field}`),
        value: formData.get(`company.${field}`) ? 'has value' : 'missing'
      })),
      caseStudy: caseStudyFields.map(field => ({
        field: `caseStudy.${field}`,
        present: formData.has(`caseStudy.${field}`),
        value: formData.get(`caseStudy.${field}`) ? 'has value' : 'missing'
      })),
      files: {
        caseStudyPdf: formData.has('caseStudy.caseStudyPdf'),
        additionalFiles: formData.getAll('caseStudy.additionalFiles').length
      },
      consent: {
        confidentiality: formData.get('confidentiality'),
        consentToContact: formData.get('consentToContact')
      }
    });

    // Validate environment variables
    console.log(`[${requestId}] 🔧 [NEXT.JS] Environment variables check:`, {
      apiUrl: process.env.NEXT_PUBLIC_PARTNERS_API_URL,
      hasToken: !!process.env.PARTNERS_API_TOKEN,
      tokenLength: process.env.PARTNERS_API_TOKEN?.length || 0,
      tokenPreview: process.env.PARTNERS_API_TOKEN ? '***MASKED***' : 'UNDEFINED'
    });
    
    if (!process.env.NEXT_PUBLIC_PARTNERS_API_URL || !process.env.PARTNERS_API_TOKEN) {
      console.error(`[${requestId}] ❌ [NEXT.JS] Missing environment variables:`, {
        hasApiUrl: !!process.env.NEXT_PUBLIC_PARTNERS_API_URL,
        hasToken: !!process.env.PARTNERS_API_TOKEN
      });
      throw new Error("Missing required environment variables");
    }

    // Log API request
    console.log(`[${requestId}] Forwarding request to API:`, {
      url: process.env.NEXT_PUBLIC_PARTNERS_API_URL + "/partners/apply",
      method: "POST",
      hasToken: !!process.env.PARTNERS_API_TOKEN
    });

    // Transform form data to match API expectations
    console.log(`[${requestId}] 🔄 [NEXT.JS] Starting data transformation...`);
    const transformedFormData = new FormData();
    
    // Map company fields
    const companyFieldMap: Record<string, string> = {
      'company.name': 'body.company_name',
      'company.website': 'body.company_website',
      'company.country': 'body.company_country',
      'company.customerProfile': 'body.company_customer_profile',
      'company.contactName': 'body.company_contact_name',
      'company.contactEmail': 'body.company_contact_email',
      'company.contactRole': 'body.company_contact_role',
      'company.linkedinProfile': 'body.company_linkedin_profile',
      'company.githubProfile': 'body.company_github_profile',
      'company.twitterProfile': 'body.company_twitter_profile',
      'company.companySize': 'body.company_company_size',
      'company.yearsInBusiness': 'body.company_years_in_business'
    };

    // Map case study fields
    const caseStudyFieldMap: Record<string, string> = {
      'caseStudy.businessImpact': 'body.case_study_business_impact',
      'caseStudy.whyLangflow': 'body.case_study_why_langflow',
      'caseStudy.architectureOverview': 'body.case_study_architecture_overview',
      'caseStudy.successMetrics': 'body.case_study_success_metrics',
      'caseStudy.financialImpact': 'body.case_study_financial_impact',
      'caseStudy.painPoints': 'body.case_study_pain_points',
      'caseStudy.previousSolution': 'body.case_study_previous_solution',
      'caseStudy.implementationTime': 'body.case_study_implementation_time',
      'caseStudy.timeToValue': 'body.case_study_time_to_value',
      'caseStudy.efficiencyGains': 'body.case_study_efficiency_gains',
      'caseStudy.costSavings': 'body.case_study_cost_savings',
      'caseStudy.customerFeedback': 'body.case_study_customer_feedback',
      'caseStudy.referenceContact': 'body.case_study_reference_contact',
      'caseStudy.publicLink': 'body.case_study_public_link',
      'caseStudy.videoUrl': 'body.case_study_video_url'
    };

    // Create a single body object to hold all form data
    const bodyData: Record<string, any> = {};

    // Add company fields
    console.log(`[${requestId}] 🏢 [NEXT.JS] Processing company fields...`);
    for (const [oldKey, newKey] of Object.entries(companyFieldMap)) {
      const value = formData.get(oldKey);
      const fieldName = newKey.replace('body.', '');
      bodyData[fieldName] = value?.toString() || '';
      console.log(`[${requestId}]   ✓ ${oldKey} → ${fieldName}:`, { 
        value: value?.toString() || '', 
        isEmpty: !value || value.toString().trim() === '',
        type: typeof value
      });
    }

    // Add case study fields
    console.log(`[${requestId}] 📋 [NEXT.JS] Processing case study fields...`);
    for (const [oldKey, newKey] of Object.entries(caseStudyFieldMap)) {
      const value = formData.get(oldKey);
      const fieldName = newKey.replace('body.', '');
      bodyData[fieldName] = value?.toString() || '';
      console.log(`[${requestId}]   ✓ ${oldKey} → ${fieldName}:`, { 
        value: value?.toString() || '', 
        isEmpty: !value || value.toString().trim() === '',
        type: typeof value
      });
    }

    // Add consent fields
    console.log(`[${requestId}] ✅ [NEXT.JS] Processing consent fields...`);
    const confidentialityValue = formData.get('confidentiality')?.toString();
    const consentToContactValue = formData.get('consentToContact')?.toString();
    
    bodyData.confidentiality = confidentialityValue === 'true';
    bodyData.consent_to_contact = consentToContactValue === 'true';
    
    console.log(`[${requestId}]   ✓ confidentiality:`, { 
      raw: confidentialityValue, 
      parsed: bodyData.confidentiality,
      type: typeof bodyData.confidentiality
    });
    console.log(`[${requestId}]   ✓ consent_to_contact:`, { 
      raw: consentToContactValue, 
      parsed: bodyData.consent_to_contact,
      type: typeof bodyData.consent_to_contact
    });

    // Validate required fields before sending to FastAPI
    const requiredFields = [
      'company_name', 'company_website', 'company_country', 'company_customer_profile',
      'company_contact_name', 'company_contact_email', 'company_contact_role',
      'company_linkedin_profile', 'company_company_size', 'company_years_in_business',
      'case_study_business_impact', 'case_study_why_langflow', 'case_study_architecture_overview',
      'case_study_success_metrics', 'case_study_financial_impact', 'confidentiality', 'consent_to_contact'
    ];
    
    console.log(`[${requestId}] 🔍 [NEXT.JS] Validating required fields...`);
    const fieldValidation = requiredFields.map(field => {
      const value = bodyData[field];
      const isValid = value && value.toString().trim() !== '';
      return {
        field,
        value: value?.toString() || 'undefined',
        isValid,
        type: typeof value
      };
    });
    
    console.log(`[${requestId}] 📋 [NEXT.JS] Field validation results:`, fieldValidation);
    
    const missingFields = requiredFields.filter(field => 
      !bodyData[field] || bodyData[field].toString().trim() === ''
    );
    
    if (missingFields.length > 0) {
      console.error(`[${requestId}] ❌ [NEXT.JS] Missing required fields:`, missingFields);
      console.log(`[${requestId}] ⚠️ [NEXT.JS] TEMPORARILY SKIPPING VALIDATION FOR DEBUGGING`);
      // return NextResponse.json(
      //   { 
      //     error: "Missing required fields",
      //     missingFields,
      //     requestId
      //   },
      //   { status: 400 }
      // );
    }

    console.log(`[${requestId}] 📊 [NEXT.JS] Body data summary:`, {
      totalFields: Object.keys(bodyData).length,
      requiredFields: Object.entries(bodyData).filter(([_, value]) => value !== '' && value !== null && value !== undefined).length,
      emptyFields: Object.entries(bodyData).filter(([_, value]) => value === '' || value === null || value === undefined).length,
      booleanFields: Object.entries(bodyData).filter(([_, value]) => typeof value === 'boolean').length,
      allRequiredFieldsPresent: missingFields.length === 0
    });

    // Add all fields directly to FormData
    console.log(`[${requestId}] 📤 [NEXT.JS] Adding all fields to FormData...`);
    console.log(`[${requestId}] 🔍 [NEXT.JS] BodyData before transformation:`, bodyData);
    
    Object.entries(bodyData).forEach(([key, value]) => {
      const fieldName = `body.${key}`;
      const stringValue = value.toString();
      transformedFormData.append(fieldName, stringValue);
      console.log(`[${requestId}]   ✓ Added ${fieldName}:`, { 
        originalValue: value,
        stringValue: stringValue, 
        type: typeof value,
        isEmpty: stringValue.trim() === '',
        length: stringValue.length
      });
    });
    
    // Verify FormData contents
    console.log(`[${requestId}] 🔍 [NEXT.JS] Verifying FormData contents after transformation:`);
    for (const [key, value] of transformedFormData.entries()) {
      if (value instanceof File) {
        console.log(`[${requestId}]   ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`[${requestId}]   ${key}: "${value}" (${typeof value}, length: ${value.length})`);
      }
    }

    // Handle files separately
    console.log(`[${requestId}] 📁 [NEXT.JS] Processing files...`);
    const caseStudyPdf = formData.get('caseStudy.caseStudyPdf');
    if (caseStudyPdf instanceof File) {
      transformedFormData.append('body.case_study_pdf', caseStudyPdf);
      console.log(`[${requestId}]   ✓ Added case study PDF:`, {
        name: caseStudyPdf.name,
        type: caseStudyPdf.type,
        size: `${(caseStudyPdf.size / (1024 * 1024)).toFixed(2)}MB`
      });
    } else {
      console.log(`[${requestId}]   ⚠️ No case study PDF found`);
    }

    const additionalFiles = formData.getAll('caseStudy.additionalFiles');
    if (additionalFiles.length > 0) {
      console.log(`[${requestId}]   📎 Adding ${additionalFiles.length} additional files...`);
      additionalFiles.forEach((file, index) => {
        if (file instanceof File) {
          transformedFormData.append(`body.additional_files`, file);
          console.log(`[${requestId}]     ✓ Additional file ${index + 1}:`, {
            name: file.name,
            type: file.type,
            size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
          });
        }
      });
    } else {
      console.log(`[${requestId}]   ⚠️ No additional files found`);
    }

    // Log final transformed data
    console.log(`[${requestId}] 📊 [NEXT.JS] Final FormData summary:`, {
      totalFields: Array.from(transformedFormData.entries()).length,
      fieldTypes: Array.from(transformedFormData.entries()).map(([key, value]) => ({
        key,
        type: value instanceof File ? `File: ${value.name}` : typeof value,
        size: value instanceof File ? `${(value.size / (1024 * 1024)).toFixed(2)}MB` : 'N/A'
      }))
    });

    // Forward the request to the external API
    const apiUrl = process.env.NEXT_PUBLIC_PARTNERS_API_URL + "/partners/apply";
    const authToken = process.env.PARTNERS_API_TOKEN;
    
    console.log(`[${requestId}] 🌐 [NEXT.JS] Sending request to FastAPI...`);
    console.log(`[${requestId}] 📡 [NEXT.JS] Request details:`, {
      url: apiUrl,
      method: "POST",
      hasToken: !!authToken,
      tokenLength: authToken?.length || 0,
      tokenPreview: authToken ? '***MASKED***' : 'UNDEFINED',
      formDataSize: Array.from(transformedFormData.entries()).length,
      headers: {
        "Authorization": "Bearer ***MASKED***",
        "X-Request-ID": requestId
      }
    });
    
    // Log final FormData being sent
    console.log(`[${requestId}] 📤 [NEXT.JS] Final FormData being sent to FastAPI:`, {
      entries: Array.from(transformedFormData.entries()).map(([key, value]) => ({
        key,
        type: value instanceof File ? `File: ${value.name}` : typeof value,
        size: value instanceof File ? `${(value.size / (1024 * 1024)).toFixed(2)}MB` : 'N/A'
      }))
    });
    
    let response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "X-Request-ID": requestId,
          // Não definimos Content-Type aqui pois o fetch o fará automaticamente com o boundary correto para multipart/form-data
        },
        body: transformedFormData,
        // Add timeout
        signal: AbortSignal.timeout(30000) // 30 seconds timeout
      });
    } catch (fetchError) {
      console.error(`[${requestId}] 🚨 [NEXT.JS] Fetch error:`, {
        error: fetchError instanceof Error ? {
          name: fetchError.name,
          message: fetchError.message,
          cause: fetchError.cause
        } : fetchError,
        url: apiUrl,
        hasToken: !!authToken
      });
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: "Request timeout - FastAPI server did not respond within 30 seconds",
            requestId
          },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { 
          error: "Failed to connect to FastAPI server",
          details: fetchError instanceof Error ? fetchError.message : "Unknown error",
          requestId
        },
        { status: 503 }
      );
    }

    // Log API response
    console.log(`[${requestId}] 📨 [NEXT.JS] FastAPI response received:`, {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      console.log(`[${requestId}] ❌ [NEXT.JS] FastAPI returned error status: ${response.status}`);
      const errorData = await response.json();
      
      // Enhanced error logging for validation errors
      if (response.status === 422 && Array.isArray(errorData.detail)) {
        console.error(`[${requestId}] 🔍 [NEXT.JS] Validation errors from FastAPI:`, {
          total_errors: errorData.detail.length,
          errors: errorData.detail.map((error: any) => ({
            field: error.loc ? error.loc.join('.') : 'unknown',
            type: error.type,
            message: error.msg,
            received: error.input
          }))
        });
      } else {
        console.error(`[${requestId}] 🚨 [NEXT.JS] FastAPI error response:`, errorData);
      }

      // Return a more user-friendly error response
      return NextResponse.json(
        { 
          error: "Failed to submit application",
          validation_errors: response.status === 422 ? errorData.detail.map((error: any) => ({
            field: error.loc ? error.loc.join('.') : 'unknown',
            message: error.msg
          })) : undefined,
          requestId
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`[${requestId}] ✅ [NEXT.JS] Application submitted successfully to FastAPI:`, {
      success: true,
      applicationId: data.applicationId,
      responseData: data
    });
    
    return NextResponse.json({
      ...data,
      requestId // Include requestId in success response
    });
  } catch (error) {
    console.error(`[${requestId}] 🚨 [NEXT.JS] Unhandled error in API route:`, {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    });
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        requestId, // Include requestId in error response
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
