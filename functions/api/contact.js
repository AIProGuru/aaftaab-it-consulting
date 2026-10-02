const DEFAULT_TO_EMAIL = "contact@aaftaab.com";
const DEFAULT_FROM_EMAIL = "contact@aaftaab.com";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function clean(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

async function sendWithCloudflareEmailApi(env, email) {
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !token) {
    throw new Error("Cloudflare Email API credentials are not configured.");
  }

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Cloudflare Email API failed: ${detail}`);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();

  if (clean(formData.get("website"))) {
    return jsonResponse({ ok: true });
  }

  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 180);
  const service = clean(formData.get("service"), 180);
  const message = clean(formData.get("message"), 4000);

  if (!name || !email || !service) {
    return jsonResponse({ ok: false, error: "Missing required fields." }, 400);
  }

  const to = clean(env.CONTACT_TO_EMAIL, 180) || DEFAULT_TO_EMAIL;
  const from = clean(env.CONTACT_FROM_EMAIL, 180) || DEFAULT_FROM_EMAIL;
  const text = [
    "New consultation request",
    "",
    `Name: ${name}`,
    `Work email: ${email}`,
    `Service: ${service}`,
    "",
    "Project or business challenge:",
    message || "Not provided",
  ].join("\n");

  const outboundEmail = {
    to,
    from,
    subject: `Consultation request from ${name}`,
    text,
  };

  await sendWithCloudflareEmailApi(env, outboundEmail);

  return jsonResponse({ ok: true });
}

export function onRequestGet() {
  return jsonResponse({ ok: false, error: "Method not allowed." }, 405);
}