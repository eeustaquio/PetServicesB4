# Deployment Rollback Procedures

This document describes how to roll back deployments for the PetServicesb3 app.

## Docker Rollback
- Use Docker Hub to pull a previous image tag:
  ```sh
  docker pull <your-dockerhub-username>/petservicesb3:<previous-tag>
  docker run -d -p 3000:3000 <your-dockerhub-username>/petservicesb3:<previous-tag>
  ```
- Update your deployment scripts or infrastructure to use the previous tag if needed.

## Firebase Hosting Rollback
- Use the Firebase Console to view Hosting release history and roll back to a previous version with one click.
- Or use the CLI:
  ```sh
  firebase hosting:rollback <site> <version>
  ```
  See: https://firebase.google.com/docs/hosting/full-config#rollback

## GitHub Actions Rollback
- Revert to a previous commit in GitHub and push to `master` to trigger a redeploy.
- Or use the GitHub UI to revert a PR/commit.

## Best Practices
- Always verify the previous version is stable before rolling back.
- Document the reason for rollback and notify the team.
- Monitor the app after rollback for any issues.

---

Update this file with any custom rollback scripts or procedures as your deployment process evolves.
