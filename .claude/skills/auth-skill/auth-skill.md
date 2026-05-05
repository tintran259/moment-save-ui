---
description: >
  Dùng khi làm việc với authentication: login/register email, OTP verify, forgot/reset
  password, Google OAuth, JWT token management, Axios interceptor refresh token.
  Invoke khi: sửa login flow, sửa OTP screen, thêm OAuth provider, fix token refresh,
  sửa redirect sau login, hoặc bất kỳ thứ gì liên quan đến auth guard/session.
---

# Auth Skill

## What it does
Email + OTP login/register. Google OAuth. JWT access + refresh token. Onboarding flow for new users.

---

## Auth Flow

```
Register:
  email + password → POST /auth/register → send OTP email
  → OTP verify screen → POST /auth/verify-email → accessToken + refreshToken
  → Check hasGoal → if no goal → (onboarding)/goal-setup → (protected)
                   → if has goal → (protected)

Login:
  email + password → POST /auth/login → accessToken + refreshToken
  → (protected)

Forgot password:
  email → POST /auth/forgot-password → send OTP
  → POST /auth/verify-reset-otp → resetToken
  → POST /auth/reset-password (with resetToken) → done

Google OAuth:
  expo-auth-session → Google token → POST /auth/google → accessToken + refreshToken
```

---

## Key Files

### Frontend
| File | Purpose |
|------|---------|
| `src/features/auth/api/auth.api.ts` | All auth API calls |
| `src/features/auth/hooks/useLogin.ts` | Login mutation |
| `src/features/auth/hooks/useRegister.ts` | Register mutation |
| `src/features/auth/hooks/useVerifyEmail.ts` | OTP verify mutation |
| `src/features/auth/hooks/useResendOtp.ts` | Resend OTP mutation |
| `src/features/auth/hooks/useForgotPassword.ts` | Forgot password mutation |
| `src/features/auth/hooks/useVerifyResetOtp.ts` | Verify reset OTP |
| `src/features/auth/hooks/useResetPassword.ts` | Reset password mutation |
| `src/features/auth/hooks/useOAuthLogin.ts` | Google OAuth flow |
| `src/features/auth/hooks/useLogout.ts` | Clear tokens + clear goal + redirect |
| `src/features/auth/hooks/useAuth.ts` | Read auth state (isLoggedIn, user) |
| `src/services/token.service.ts` | AsyncStorage: save/get/clear accessToken + refreshToken |
| `src/services/axios.ts` | Axios instance + interceptor: auto-attach token, auto-refresh on 401 |

### Screens
| File | Route |
|------|-------|
| `src/features/auth/screens/LoginScreen/index.tsx` | `(auth)/login` |
| `src/features/auth/screens/RegisterScreen/index.tsx` | `(auth)/register` |
| `src/features/auth/screens/OtpVerificationScreen/index.tsx` | `(auth)/verify-otp` |
| `src/features/auth/screens/ForgotPasswordScreen/index.tsx` | `(auth)/forgot-password` |
| `src/features/auth/screens/ResetPasswordScreen/index.tsx` | `(auth)/reset-password` |
| `src/features/auth/screens/WelcomeScreen/index.tsx` | `(onboarding)/welcome` |
| `src/features/onboarding/screens/GoalSetupScreen/index.tsx` | `(onboarding)/goal-setup` |

### Backend
| File | Purpose |
|------|---------|
| `src/modules/auth/auth.controller.ts` | All auth endpoints |
| `src/modules/auth/auth.service.ts` | Business logic: hash password, generate OTP, issue JWT |
| `src/modules/auth/entities/otp-code.entity.ts` | OTP entity with `purpose` enum (VERIFY_EMAIL / RESET_PASSWORD) |
| `src/modules/auth/strategies/jwt.strategy.ts` | JWT validation strategy |
| `src/modules/mail/mail.service.ts` | sendOtp() — Gmail SMTP via nodemailer |
| `src/modules/mail/mail.module.ts` | Exports MailService |
| `src/common/guards/jwt-auth.guard.ts` | JwtAuthGuard for protected routes |
| `src/common/decorators/current-user.decorator.ts` | @CurrentUser() → `{ sub: userId }` |

### Types
| File | Purpose |
|------|---------|
| `src/types/auth.types.ts` | AuthTokens, LoginPayload, RegisterPayload, etc. |
| `src/types/user.types.ts` | User, UserGoal |

---

## Token Management
- `accessToken` — short-lived, attached to every request via Axios interceptor
- `refreshToken` — long-lived, stored in AsyncStorage, used on 401 to get new accessToken
- On logout: clear both tokens + clear goal from AsyncStorage + GoalContext

## OTP
- 6-digit code, valid 5 minutes
- Purpose enum: `VERIFY_EMAIL` | `RESET_PASSWORD`
- Email template in `mail.service.ts` (HTML, inline styles)

## Google OAuth
- iOS Client ID: `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- Web Client ID: `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- Backend: POST /auth/google with Google token → verify → issue JWT

## Route groups
- `(auth)/` — unauthenticated screens
- `(onboarding)/` — post-register, pre-main-app
- `(protected)/` — requires JWT, redirects to login if no token
