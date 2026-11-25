export const environment = {
  // Same-origin path when CloudFront proxies /api/* to the Lambda (no CORS needed).
  // If calling API Gateway / a Function URL directly, put the full https:// URL here instead.
  contactApiUrl: '/api/contact',
};