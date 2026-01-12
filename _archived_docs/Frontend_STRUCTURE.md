# Frontend Structure Documentation

## 📂 Struktur Folder

```
Frontend/src/
├── components/              # Komponen reusable
│   ├── ui/                 # UI Components Library
│   │   ├── Alert.jsx       # Alert notifications (success, error, warning, info)
│   │   ├── Badge.jsx       # Status badges
│   │   ├── Button.jsx      # Button dengan berbagai variant
│   │   ├── Card.jsx        # Card container
│   │   ├── Input.jsx       # Input field dengan icon dan error state
│   │   ├── Modal.jsx       # Modal dialog
│   │   └── index.js        # Export semua UI components
│   ├── QrGenerator.jsx     # Component untuk generate QR code
│   ├── QrScanner.jsx       # Component untuk scan QR code
│   └── SeriScanner.jsx     # Component untuk scan nomor seri meter (OCR)
│
├── pages/                   # Halaman aplikasi
│   ├── Login.jsx           # Halaman login (redesigned)
│   ├── Signup.jsx          # Halaman registrasi (redesigned)
│   ├── ScanPage.jsx        # Dashboard utama dengan tab interface
│   ├── InputKubik.jsx      # Form input pemakaian meter (redesigned)
│   └── PelangganStatus.jsx # Status pencatatan pelanggan (redesigned)
│
├── layouts/                 # Layout templates
│   ├── AuthLayout.jsx      # Layout untuk halaman auth (login/signup)
│   └── MainLayout.jsx      # Layout untuk halaman setelah login
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.js          # Hook untuk authentication
│   └── useFetch.js         # Hook untuk data fetching
│
├── utils/                   # Helper functions
│   ├── cropImage.js        # Image cropping utility
│   └── normalizeImage.js   # Image normalization
│
├── constants/               # Constants dan config
│   └── index.js            # Months, categories, max file size, etc
│
├── api.js                   # API configuration dan base URL
├── App.jsx                  # Main app component dengan routing
├── App.css                  # App-specific styles
├── index.css                # Global styles dengan Tailwind
└── main.jsx                 # Entry point
```

## 🎨 UI Components

### Button

**Variants:** primary, secondary, danger, success, ghost  
**Sizes:** sm, md, lg  
**Features:** Loading state, disabled state, icon support

```jsx
import { Button } from "../components/ui";

<Button variant="primary" size="lg" onClick={handleClick}>
  Simpan Data
</Button>;
```

### Input

**Features:** Label, icon, error message, validation  
**Types:** text, password, email, number, file

```jsx
import { Input } from "../components/ui";

<Input label="Username" type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} error={error} icon={<UserIcon />} />;
```

### Card

**Features:** Title, subtitle, actions slot  
**Use Cases:** Container untuk content, form sections

```jsx
import { Card } from "../components/ui";

<Card title="Informasi Pelanggan" subtitle="Data pelanggan yang terdaftar" actions={<Button>Edit</Button>}>
  {/* Content */}
</Card>;
```

### Alert

**Types:** success, error, warning, info  
**Features:** Dismissible, title, message

```jsx
import { Alert } from "../components/ui";

<Alert type="success" title="Berhasil!" message="Data berhasil disimpan" onClose={() => setAlert(null)} />;
```

### Badge

**Variants:** default, success, danger, warning, info  
**Sizes:** sm, md, lg

```jsx
import { Badge } from "../components/ui";

<Badge variant="success">Selesai</Badge>;
```

### Modal

**Sizes:** sm, md, lg, xl  
**Features:** Backdrop, close button, title

```jsx
import { Modal } from "../components/ui";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Konfirmasi" size="md">
  {/* Modal content */}
</Modal>;
```

## 🔗 Custom Hooks

### useAuth

Mengelola state authentication user

```jsx
import { useAuth } from "../hooks/useAuth";

const { user, login, logout } = useAuth();
```

### useFetch

Hook untuk data fetching dengan loading dan error state

```jsx
import { useFetch } from "../hooks/useFetch";

const { data, loading, error } = useFetch("/api/endpoint");
```

## 🎯 Layout System

### AuthLayout

Layout untuk halaman yang belum login (Login, Signup)

- Gradient background
- Centered content
- Logo/brand display

### MainLayout

Layout untuk halaman setelah login

- Header dengan user info
- Navigation
- Logout button
- Content area

## 📱 Responsive Design

Semua komponen dan halaman sudah responsive dengan breakpoints:

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md)
- **Desktop:** > 1024px (lg)

Menggunakan Tailwind utility classes:

- `sm:` untuk mobile landscape & tablet
- `md:` untuk tablet landscape
- `lg:` untuk desktop

## 🎨 Design System

### Colors

- **Primary:** Blue (600) - Actions, links
- **Success:** Green (600) - Success states
- **Warning:** Yellow (600) - Warning states
- **Danger:** Red (600) - Error states
- **Gray:** Shades 50-900 - Text, borders, backgrounds

### Typography

- **Headings:** Font bold, sizes 3xl, 2xl, xl
- **Body:** Font normal, size base
- **Small:** Font normal, size sm, xs

### Spacing

Menggunakan Tailwind spacing scale (0-96)

- Padding: p-{size}
- Margin: m-{size}
- Gap: gap-{size}

### Shadows

- `shadow-sm` - Subtle shadow untuk cards
- `shadow-md` - Medium shadow untuk hover states
- `shadow-lg` - Large shadow untuk modals
- `shadow-xl` - Extra large shadow untuk important elements

## 🚀 Best Practices

1. **Component Reusability**

   - Gunakan UI components dari `components/ui/`
   - Buat custom components untuk logic khusus

2. **State Management**

   - Gunakan custom hooks untuk logic yang reusable
   - Keep state as close to where it's used as possible

3. **Styling**

   - Gunakan Tailwind utility classes
   - Hindari inline styles kecuali dynamic values
   - Gunakan `className` composition

4. **Error Handling**

   - Selalu handle loading states
   - Show user-friendly error messages
   - Provide retry options

5. **Accessibility**
   - Use semantic HTML
   - Provide proper labels
   - Ensure keyboard navigation works

## 📝 File Naming Conventions

- **Components:** PascalCase (e.g., `Button.jsx`, `UserCard.jsx`)
- **Hooks:** camelCase with 'use' prefix (e.g., `useAuth.js`)
- **Utils:** camelCase (e.g., `cropImage.js`)
- **Constants:** camelCase (e.g., `index.js`)
- **Pages:** PascalCase (e.g., `Login.jsx`, `ScanPage.jsx`)

## 🔧 Development Tips

1. **Import UI Components:**

   ```jsx
   import { Button, Input, Card } from "../components/ui";
   ```

2. **Use Constants:**

   ```jsx
   import { MONTHS, MAX_FILE_SIZE } from "../constants";
   ```

3. **API Calls:**

   ```jsx
   import { API_BASE_URL } from "../api";
   ```

4. **Tailwind Classes:**

   - Use `className` prop
   - Combine multiple utilities
   - Use responsive prefixes

5. **Icons:**
   - Using Heroicons via SVG
   - 24x24 for large icons
   - 20x20 for medium icons
   - 16x16 for small icons
