import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({
      message: "file not extracted from from data error",
    });
  }

  return NextResponse.json({ message: "Process complete successfully" });
}
