import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    // Basic validation
    if (!name || !email || !description || !file) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/zip") {
      return NextResponse.json(
        { message: "File must be a .zip file" },
        { status: 400 }
      );
    }

    // Validate file size (default 100MB)
    const maxSize = parseInt(process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100") * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: `File size must be less than ${process.env.NEXT_PUBLIC_PARTNERS_MAX_ZIP_MB || "100"}MB` },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length < 200 || description.length > 1500) {
      return NextResponse.json(
        { message: "Description must be between 200 and 1500 characters" },
        { status: 400 }
      );
    }

    // TODO: In a real implementation, you would:
    // 1. Upload the file to your storage service (S3, GCS, etc.)
    // 2. Save the application data to your database
    // 3. Send notification emails to your team
    // 4. Send confirmation email to the applicant

    // For now, we'll just log the application and return success
    console.log("Partner Application Received:", {
      name,
      email,
      company: company || "Not provided",
      description: description.substring(0, 100) + "...",
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement actual file storage
    // const fileUrl = await uploadFileToStorage(file);
    
    // TODO: Implement database storage
    // await saveApplicationToDatabase({
    //   name,
    //   email,
    //   company,
    //   description,
    //   fileUrl,
    //   submittedAt: new Date()
    // });

    // TODO: Send notifications
    // await sendTeamNotification({ name, email, company });
    // await sendConfirmationEmail(email);

    return NextResponse.json(
      { 
        message: "Application submitted successfully",
        applicationId: `APP-${Date.now()}` // Temporary ID for demo
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing partner application:", error);
    
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
