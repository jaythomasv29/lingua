<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lingua app. Here's a summary of all changes made:

- **`app.config.js`** — Created (replaces `app.json`) to support dynamic `extra` config reading `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from environment variables and passing them to the app via `expo-constants`.
- **`.env`** — Created with `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` values (gitignored).
- **`lib/posthog.ts`** — Created the singleton PostHog client, initialized from `Constants.expoConfig?.extra`, with lifecycle event capture, batching, and graceful disabled-mode when the token is absent.
- **`app/_layout.tsx`** — Wrapped the entire app in `PostHogProvider` (with touch autocapture enabled) and added a `ScreenTracker` component that calls `posthog.screen()` on every Expo Router pathname change.
- **`app/onboarding.tsx`** — Captures `onboarding_get_started_clicked` when the user taps the Get Started button.
- **`app/(auth)/sign-up.tsx`** — Captures `user_signed_up` (with `posthog.identify()`) on successful email verification, and `user_signed_in_social` on OAuth completion.
- **`app/(auth)/sign-in.tsx`** — Captures `user_signed_in` (with `posthog.identify()`) on successful email code verification, and `user_signed_in_social` on OAuth completion.
- **`app/language-selection.tsx`** — Captures `language_selected` with `language_code` and `language_name` properties when the user confirms their choice.
- **`app/(tabs)/index.tsx`** — Captures `lesson_continued` (with language/unit/lesson context) on the Continue button, and `ai_video_call_started` on the video call button.

## Events

| Event | Description | File |
|---|---|---|
| `onboarding_get_started_clicked` | User tapped "Get Started" on the onboarding screen — top of conversion funnel | `app/onboarding.tsx` |
| `user_signed_up` | User completed email sign-up and verification | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | User completed email sign-in via OTP | `app/(auth)/sign-in.tsx` |
| `user_signed_in_social` | User signed in via Google or Apple OAuth | `app/(auth)/sign-in.tsx`, `app/(auth)/sign-up.tsx` |
| `language_selected` | User confirmed their chosen learning language | `app/language-selection.tsx` |
| `lesson_continued` | User tapped "Continue" on the Continue Learning card | `app/(tabs)/index.tsx` |
| `ai_video_call_started` | User tapped the video call button in Next Up | `app/(tabs)/index.tsx` |

## Next steps

We've built insights and a dashboard to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1628623)
- [Acquisition Funnel: Onboarding → Sign Up → Language Selected](/insights/ctgHa4Rq)
- [New Sign-Ups Over Time](/insights/s6cFqxtn)
- [Sign-Ins Over Time (Email + Social)](/insights/gjovPxmr)
- [Languages Selected](/insights/7y0PCHpP)
- [Lesson & AI Video Engagement](/insights/ZWVSeRCP)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-expo/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
