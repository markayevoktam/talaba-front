# Talaba Front

Universitet talabalari, bitiruvchilari va ularning yutuqlari haqidagi axborot tizimining frontend qismi.
Angular 13 (Angular CLI 13.2.4) da yozilgan, backend alohida REST API sifatida ishlaydi.

## Tuzilishi

```
src/app/
├── core/      AccountService, JwtUtil, UserRouteAccessGuard
├── model/     Fakultet, Yunalish, Guruh, Talaba, Student, Yutuq, Xarakter, Loyiha, User
├── service/   har bir bo'lim uchun CRUD servislari
├── public/    ochiq sahifalar: bosh sahifa, talaba profili, iqtidorlilar, bitiruvchilar, kirish/ro'yxatdan o'tish
├── admin/     lazy-load qilinadigan boshqaruv paneli (10 ta bo'lim)
└── shared/    SharedModule, Material modullari, interceptor, 404 sahifasi
```

Ma'lumot ierarxiyasi: **Fakultet → Yo'nalish → Guruh → Talaba**.

## Ishga tushirish

```bash
npm ci
npm start          # http://localhost:4200
```

Backend manzili `src/environments/environment.ts` da (`baseApi`) ko'rsatiladi:
dev uchun `http://localhost:8080`, prod uchun `src/environments/environment.prod.ts`.
Servislar bu manzilga `/api/...` qo'shadi, shuning uchun `baseApi` faqat host bo'lishi kerak.

## Buyruqlar

| Buyruq | Vazifasi |
| --- | --- |
| `npm start` | dev server |
| `npm run build` | prod build (`dist/talaba-front`) |
| `npm test` | testlar (brauzer ochiladi) |
| `npm run test:ci` | testlar (ChromeHeadless, CI uchun) |

## Autentifikatsiya

JWT ishlatiladi. Token `JwtUtil` orqali saqlanadi ("meni eslab qol" belgilansa `localStorage`,
aks holda `sessionStorage`), `AuthInterceptor` uni har bir so'rovga qo'shadi va xatoliklarni
foydalanuvchiga ko'rsatadi. `/admin` bo'limi `UserRouteAccessGuard` bilan himoyalangan:
token muddati tekshiriladi, token rollarni e'lon qilsa `ADMIN` roli talab qilinadi.

## Deploy

`master` shoxobchasiga har push'da GitHub Actions testlarni va build'ni bajarib,
Cloudflare Pages'ga joylaydi (`.github/workflows/deploy.yml`).
SPA yo'nalishlari uchun `src/_redirects` fayli ishlatiladi.
