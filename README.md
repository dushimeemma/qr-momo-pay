# 📱 QR USSD Generator

A simple **Next.js + TypeScript + TailwindCSS** application that generates QR codes for USSD payments.

Users can:

- Enter a **Shop Name**
- Choose **Code** or **Phone Number**
- Generate a **QR Code**
- Scan → opens dialer with pre-filled USSD
- **Download QR as PNG**
- **Copy USSD**

---

## 🚀 Features

- ✅ Generate QR for:
  - Code → `*182*8*1*{code}#`
  - Phone → `*182*1*1*{phone}#`

- ✅ Uses `tel:` scheme for mobile dialing
- ✅ Download QR as PNG
- ✅ Copy USSD to clipboard
- ✅ Clean UI with TailwindCSS
- ✅ Fully client-side (no backend required)

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **qrcode.react**

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd qr-ussd-generator
```

---

### 2. Install dependencies

Using **Yarn**:

```bash
yarn install
```

Or using npm:

```bash
npm install
```

---

### 3. Run development server

```bash
yarn dev
```

or

```bash
npm run dev
```

---

### 4. Open in browser

```
http://localhost:3000
```

---

## ⚙️ Configuration

### TailwindCSS

This project uses **Tailwind v3 (recommended)**.

Ensure you have:

#### `tailwind.config.js`

```js
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

#### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧠 How it works

### 1. USSD Generation

| Mode  | Generated USSD      |
| ----- | ------------------- |
| Code  | `*182*8*1*{code}#`  |
| Phone | `*182*1*1*{phone}#` |

---

### 2. QR Encoding

QR encodes:

```
tel:*182*8*1*12345#
```

👉 This ensures:

- Phone recognizes it as a **dial action**
- Opens **dialer automatically**

---

### ⚠️ Important Note

- QR **will NOT auto-dial**
- It will:
  1. Open dialer
  2. Pre-fill USSD
  3. User taps call

This is a **mobile OS security restriction**

---

## 📥 Download QR

QR codes are generated using **canvas**, allowing:

```ts
canvas.toDataURL("image/png");
```

This enables:

- Download as `.png`
- Naming based on shop name

---

## 📁 Project Structure

```
app/
 ├── page.tsx
 ├── globals.css
 ├── components/
 │     └── QRGenerator.tsx
```

---

## 🚀 Build for production

```bash
yarn build
yarn start
```

---

## 🌍 Deployment

### Recommended: Vercel

```bash
npm install -g vercel
vercel
```

---

## 🧪 Testing QR

1. Generate QR
2. Scan using mobile phone
3. Expected behavior:
   - Dialer opens
   - USSD is pre-filled
   - Tap call → payment flow

---

## ⚠️ Common Issues

### ❌ QR shows text only

- Ensure it starts with:

  ```
  tel:
  ```

---

### ❌ Tailwind not working

- Use **Tailwind v3**
- Restart dev server

---

### ❌ Download not working

- Ensure using:

  ```
  QRCodeCanvas
  ```

  not SVG

---

## 🔮 Future Improvements

- 📥 Export as PDF
- 🖼 Add logo inside QR
- 🧾 Print-ready QR cards
- 📊 QR analytics
- 🏪 Multi-merchant support
- ☁️ Backend (save QR history)

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built for **mobile payment QR generation using USSD**
