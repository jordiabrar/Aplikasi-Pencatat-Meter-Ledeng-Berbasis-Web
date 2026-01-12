# Changelog

## [2.0.0] - 2026-01-06

### 🎨 Major UI/UX Redesign

#### ✨ Added

- **TailwindCSS** - Modern utility-first CSS framework
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Modern UI Components** - Reusable component library:
  - Button (multiple variants: primary, secondary, danger, success, ghost)
  - Input (with icons, labels, error states)
  - Card (with title, subtitle, actions)
  - Modal (with different sizes)
  - Badge (status indicators)
  - Alert (success, error, warning, info)
- **Layout System** - Separate layouts for authenticated and unauthenticated users
- **Custom Hooks** - `useAuth`, `useFetch` for better state management
- **Constants** - Centralized configuration (months, categories, etc)

#### 🔄 Changed

**Login & Signup Pages:**

- Modern gradient background
- Animated loading states
- Better error handling with alerts
- Icon-enhanced input fields
- Smooth transitions

**Dashboard (ScanPage):**

- Tab-based interface for different scan methods
- Info cards with statistics
- Modern card-based layout
- Better visual hierarchy

**Input Pemakaian (InputKubik):**

- Card-based sections for better organization
- Image preview before upload
- Drag & drop file upload UI
- Visual pemakaian display with gradient background
- Collapsible history section
- Better form validation and feedback

**Status Pelanggan:**

- Statistics cards (Sudah Dicatat, Belum Dicatat, Progress)
- Progress bar visualization
- Tab-based table view
- Modern table with hover effects
- Empty state illustrations
- Badge indicators

**Navigation:**

- Fixed header with gradient logo
- User info display
- Smooth logout transition

#### 🏗️ Refactored

**Backend Structure:**

- Separated routes into `routes/` folder
- Extracted image processing to `utils/`
- Centralized configuration in `config.py`
- Environment-based configuration (.env)
- Application factory pattern

**Frontend Structure:**

- Organized components into `components/ui/`
- Separated layouts into `layouts/`
- Custom hooks in `hooks/`
- Constants in `constants/`
- Centralized API configuration

#### 🔒 Security Improvements

- SECRET_KEY from environment variables
- Database credentials from environment variables
- Removed hardcoded sensitive data
- Better input validation

#### 📱 Mobile Responsive

- All pages optimized for mobile devices
- Touch-friendly buttons and inputs
- Responsive tables
- Hamburger menu ready structure

#### 🎯 User Experience

- Loading states everywhere
- Error handling with user-friendly messages
- Success notifications
- Smooth animations and transitions
- Consistent color scheme
- Better contrast and readability

### 📦 Dependencies

**Backend:**

- Flask==3.0.0
- Flask-CORS==4.0.0
- Flask-SQLAlchemy==3.1.1
- PyMySQL==1.1.0
- python-dotenv==1.0.0
- opencv-python==4.8.1.78
- pytesseract==0.3.10
- Pillow==10.1.0
- numpy==1.26.2

**Frontend:**

- tailwindcss (new)
- postcss (new)
- autoprefixer (new)
- React 19.2.0
- React Router 7.11.0
- Axios 1.5.0
- html5-qrcode 2.3.8
- react-easy-crop 4.7.5

### 🐛 Bug Fixes

- Fixed hardcoded API URLs
- Fixed missing error handlers
- Fixed file upload issues
- Fixed responsive layout bugs

### 📝 Documentation

- Updated README.md with new structure
- Added CHANGELOG.md
- Added setup instructions
- Added troubleshooting guide

---

## [1.0.0] - Initial Release

### Features

- QR Code scanning
- OCR seri meter scanning
- Pemakaian meter recording
- Customer status tracking
- Authentication system
- Photo upload functionality
