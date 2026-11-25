# Mordô contact handler (AWS SES)

Lambda function that receives the contact/demo form POST from the site and sends
it by email through Amazon SES. The browser posts to `environment.contactApiUrl`
(`/api/contact`), which must be proxied to this function (CloudFront `/api/*`
behavior or API Gateway / Function URL).

## Runtime

- Node.js 22.x or newer, ESM (`index.mjs`).
- Permissions: `ses:SendEmail` on the configured sender identity.

## Environment variables

| Variable       | Required | Description                                              |
| -------------- | -------- | -------------------------------------------------------- |
| `CONTACT_FROM` | yes      | Verified SES sender address.                             |
| `CONTACT_TO`   | yes      | Recipient(s), comma separated.                           |
| `SES_REGION`   | no       | SES region; falls back to `AWS_REGION`.                  |

Copy `.env.example` to `.env` for local reference. In Lambda, set these as function
environment variables (the `.env` file is not read at runtime).

## Local install

```bash
cd lambda/contact-handler
npm ci
```

The handler also:
- rejects non-POST/OPTIONS requests,
- validates required fields, lengths and email format,
- ignores the hidden `website` honeypot field and submissions faster than 3 s,
- HTML-escapes all user input before building the email.
