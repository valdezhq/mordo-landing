// AWS Lambda – contact form handler (Node.js 22.x or newer, ESM).
// Works behind a Function URL, an API Gateway HTTP API (payload v2), or CloudFront -> Function URL.
//

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.SES_REGION || process.env.AWS_REGION });
const MIN_FILL_MS = 3000;
const LIMITS = { name: 120, email: 254, phone: 40, company: 160, message: 5000 };

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();
const list = (s) => String(s ?? '').split(',').map((v) => v.trim()).filter(Boolean);

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body ?? '', 'base64').toString('utf8')
    : (event.body ?? '');
  const type = (event.headers?.['content-type'] ?? event.headers?.['Content-Type'] ?? '').toLowerCase();
  if (type.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return JSON.parse(raw || '{}');
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method ?? event.httpMethod;
  if (method === 'OPTIONS') return { statusCode: 204, body: '' };
  if (method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  let input;
  try {
    input = parseBody(event);
  } catch {
    return json(400, { ok: false, error: 'Invalid request body' });
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return json(400, { ok: false, error: 'Invalid request body' });
  }

  const startedAt = Number(input.startedAt);
  if (input.website || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return json(200, { ok: true });
  }

  const { name, email, phone, company, message } = input;
  const fields = { name, email, phone, company, message };
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== 'string' || !value.trim()) {
      return json(400, { ok: false, error: `Missing field: ${key}` });
    }
    if (LIMITS[key] && value.length > LIMITS[key]) {
      return json(400, { ok: false, error: `Field too long: ${key}` });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: 'Invalid email' });
  }

  const site = oneLine(input.site || 'mordo');
  const charset = 'UTF-8';

  try {
    const result = await ses.send(
      new SendEmailCommand({
        Source: process.env.CONTACT_FROM,
        Destination: { ToAddresses: list(process.env.CONTACT_TO) },
        ReplyToAddresses: [email.trim()],
        Message: {
          Subject: {
            Charset: charset,
            Data: `New demo request: ${oneLine(name)} from ${oneLine(company)}`,
          },
          Body: {
            Html: {
              Charset: charset,
              Data: `
                <h2>A new demo request has been submitted through the ${escapeHtml(site)} website</h2>
                <p>Details below:</p>
                <hr />
                <ul>
                  <li><strong>Name:</strong> ${escapeHtml(name)}</li>
                  <li><strong>Email:</strong> ${escapeHtml(email)}</li>
                  <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
                  <li><strong>Company:</strong> ${escapeHtml(company)}</li>
                </ul>
                <hr />
                <h3>Message:</h3>
                <p>${escapeHtml(message).replace(/\r?\n/g, '<br />')}</p>
              `,
            },
            Text: {
              Charset: charset,
              Data:
                `New demo request from the ${site} website\n\n` +
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nMessage:\n${message}\n`,
            },
          },
        },
      }),
    );
    return json(200, { ok: true, id: result.MessageId });
  } catch (err) {
    console.error('SES error:', err.name, err.message);
    return json(502, { ok: false, error: 'Failed to send email' });
  }
};
