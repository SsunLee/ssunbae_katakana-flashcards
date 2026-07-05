# Mobile Live Updates

This project uses Capacitor with bundled web assets plus optional Ionic Appflow Live Updates.

## What Updates Over The Air

Live Updates can ship changes to the built web bundle:

- React and Next.js client UI changes
- CSS and static assets
- Copy and study data bundled into the app
- Client-side bug fixes

These changes do not require an App Store review when they are published as a Live Update.

## What Still Needs An App Store Build

Create a normal native release when changing:

- Capacitor, native iOS, or Android dependencies
- Capacitor plugin additions or removals
- `Info.plist`, entitlements, permissions, app icons, or splash screens
- Firebase plist files, AdMob native identifiers, signing, or bundle identifiers
- Functionality that materially changes the reviewed app experience

## Configuration

`capacitor.config.ts` reads these environment variables:

```bash
CAPACITOR_WEB_DIR=.next-mobile
CAPACITOR_LIVE_UPDATES_APP_ID=6f7685c7
CAPACITOR_LIVE_UPDATES_CHANNEL=Staging
```

The Appflow app id is `6f7685c7`. If you ever need to disable Live Updates for a local diagnostic run, temporarily set `CAPACITOR_LIVE_UPDATES_APP_ID` to an empty value and change the config fallback.

The mobile scripts set `CAPACITOR_WEB_DIR=.next-mobile` because the isolated mobile build writes the exported web bundle there.

For an App Store build, set:

```bash
export CAPACITOR_LIVE_UPDATES_APP_ID=your_appflow_app_id
export CAPACITOR_LIVE_UPDATES_CHANNEL=Production
```

For a TestFlight or internal QA build, use:

```bash
export CAPACITOR_LIVE_UPDATES_APP_ID=your_appflow_app_id
export CAPACITOR_LIVE_UPDATES_CHANNEL=Staging
```

## First Native Setup

After creating the app in Ionic Appflow and setting the variables above:

```bash
npm ci
npm run mobile:sync:ios
```

Then open the workspace in Xcode:

```bash
npx cap open ios
```

Archive and submit the iOS app as usual. The binary includes the current mobile web bundle and listens to the configured Live Updates channel.

## Web Update Workflow

For normal web-layer changes:

1. Change the web code.
2. Run `npm run ota:build` locally to verify the static mobile build.
3. Push the commit.
4. Create an Appflow Web build from that commit.
5. Assign the build to `Staging`.
6. Test on a device or TestFlight build.
7. Promote the same Web build to `Production`.

The app uses `autoUpdateMethod: background`, so users keep using their current bundle while the new one downloads. The update is applied on the next app launch.

## Rollback

If a Production Live Update has an issue, reassign the previous known-good Web build to the `Production` channel in Appflow. Devices that still have that version cached can switch back quickly because `maxVersions` is set to `2`.
