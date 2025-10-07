# Monitoring & Alerting (Basic)

This project recommends using third-party services for monitoring and alerting. For Firebase/Next.js apps, consider:

- **Firebase Crashlytics** (for mobile)
- **Firebase Performance Monitoring** (for web)
- **Sentry** (for error tracking)
- **Healthchecks** or **UptimeRobot** (for uptime monitoring)

## Example: Sentry Integration

1. Sign up at https://sentry.io/ and create a project.
2. Install Sentry SDK:
   ```sh
   npm install @sentry/nextjs
   ```
3. Add Sentry config files as per [Sentry docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/).

## Example: Uptime Monitoring
- Register your app's staging/production URL with UptimeRobot or similar.
- Set up email/Slack alerts for downtime.

## Firebase Performance Monitoring
- See: https://firebase.google.com/docs/perf-mon/get-started-web

---

Document your chosen monitoring solution and alert contacts here.
