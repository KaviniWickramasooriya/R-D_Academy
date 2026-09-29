exports.syncApplicationToSheet = async (app) => {
  try {
    const GOOGLE_SCRIPT_URL = process.env.VITE_CLASSES_API_URL;
    if (!GOOGLE_SCRIPT_URL) return;

    const payload = {
      action: "syncApplication",
      regId: app.application_ref,
      studentName: `${app.first_name} ${app.last_name}`,
      age: app.age,
      guardianName: app.parent_name || "",
      whatsapp: app.whatsapp_number,
      classTitle: app.course_name,
      status: app.status || "Pending",
      payment_status: app.payment_status || "Not Paid",
      batchId: app.batch_id || "",
      accessCode: app.access_code || ""
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow"
    });

    const text = await response.text();
    const result = JSON.parse(text);
    if (result.ok) {
      console.log(`✅ Synced application ${app.application_ref} to Google Sheet.`);
    } else {
      console.error("❌ Google Sheet sync error:", result.error);
    }
  } catch (error) {
    console.error("❌ Google Sheet sync network error:", error.message);
  }
};