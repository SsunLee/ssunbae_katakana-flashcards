# SSUN EDU Privacy, Age Gate, Ads, and OTA Design

## Scope

This change prepares the current web bundle for production OTA delivery while aligning account creation and deletion with the app's actual privacy practices.

## Decisions

- Replace the remote TermsFeed document with a Korean-first, repository-owned privacy policy.
- Treat account creation as a service available only to users aged 14 or older. Date of birth is checked locally and is not stored; younger users may continue using guest learning features.
- Require affirmative acceptance of the Terms of Service and acknowledgment of the Privacy Policy at registration. Store policy versions and the acceptance timestamp with the user profile.
- List Firebase, Vercel, Google advertising, Kakao AdFit, OpenAI, Ionic Appflow, and the visitor counter according to their actual roles, including overseas processing and retention qualifications.
- Route every in-app account deletion request to the production API, return CORS headers on both successful and failed responses, show failures to the user, and clear user-scoped local caches after successful deletion.
- Keep Google test ads for developer builds. Appflow and release-oriented Android builds explicitly set `NEXT_PUBLIC_APP_ENV=production`, causing the existing production Android banner unit to be selected.
- Deliver all web-layer changes through Vercel and the Appflow `Production` Live Update channel. No native identifier or plugin change is required for this AdMob correction.

## Data Flow

Registration collects nickname, email, password, and a locally evaluated birth date. Firebase Authentication handles credentials; Firestore stores the profile, policy versions, acceptance timestamp, and study records. The birth date is discarded before the account request.

Account deletion verifies the Firebase ID token, deletes Firestore user data and the Firebase Authentication user, then clears local profile and study caches. Provider backup and security-log retention is described accurately instead of promising immediate deletion from every backup.

## Error Handling

- Invalid or under-14 birth dates block account creation with a specific message.
- Terms acceptance is required before Firebase account creation.
- Account deletion failures remain on screen and display a user-facing error.
- Appflow builds fail verification when the production environment flag or Android production ad unit is missing.

## Verification

- Unit tests cover age calculation boundaries and production build environment configuration.
- Type checking and both Next.js web and Appflow static builds must succeed.
- The generated mobile JavaScript must contain the production Android ad unit and production environment marker, and must not select the Google Android test unit in the production branch.
- The production privacy, terms, registration, and account deletion pages are checked after deployment.
