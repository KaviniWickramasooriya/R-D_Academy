# R & D Academy & Studio Portal 🎨🎤

A modern, luxury full-stack web platform built for **R & D Academy (Rising Voices Academy & Drawing Academy Studio)** located in Colombo, Sri Lanka. The platform provides a seamless public experience for prospective students to explore fine arts and vocal courses, submit online applications, and access secure class materials, alongside a robust administrative management portal.

---

## 🚀 Key Features

### **Public Portal**
* **Immersive Studio Branding**: Designed with an obsidian and gold luxury aesthetic (`#0a0a0a` and `#d4af37`), custom typography (*Playfair Display* and *Inter*), and smooth `framer-motion` animations.
* **Multi-Step Application Form**: Intuitive wizard supporting dynamic under-18 guardian detection, age calculation, and unique reference number generation (`RD-2026-XXXX`).
* **Online Classes & Itinerary Hub**: Complete schedule breakdown, program guides, and a secure **My Class** portal unlocked via individual 8-character access codes.
* **Interactive Contact Desk**: Embedded Google Maps location, direct WhatsApp integration, and a functional inquiry form with success states.
* **Exhibition Ticket Promo Modal**: Auto-triggered announcement modal on initial page load with accessibility controls.

### **Administrative Portal (`/admin`)**
* **Secure Authentication**: JWT-based session management and robust `bcrypt` password hashing.
* **Applications Management Dashboard**: Comprehensive data grid supporting real-time search, status filtering (*Pending*, *Under Review*, *Approved*, *Rejected*), and date sorting.
* **Detail Inspector & Notes**: Deep-dive applicant view showing personal data, guardian info, medical/emergency notes, and confidential internal admin note-taking.
* **Automated Email Notifications**: Instant status update emails dispatched automatically to students via Nodemailer whenever an application is approved or rejected.
* **PostgreSQL Cloud Integration**: Fully persistent cloud database architecture storing applications, admin accounts, batch assignments, and audit trails.

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, React Router.
* **Backend**: Node.js, Express.js, RESTful API architecture.
* **Database**: PostgreSQL (Cloud/Local).
* **Security & Utilities**: JSON Web Tokens (JWT), Bcrypt.js, Nodemailer.

---

## 📁 Project Structure

```text
R-D_Academy/
├── frontend/                  # React Vite Client
│   ├── src/
│   │   ├── admin/             # Admin Portal Pages & Components
│   │   ├── components/        # Shared UI Components (Navbar, Footer, Modals)
│   │   ├── pages/             # Public Pages (Home, Academies, Register, Contact)
│   │   └── context/           # Auth & Toast Context Providers
│   └── package.json
└── backend/                   # Node.js Express Server
    ├── controllers/           # Route logic (Auth, Admin, Applications)
    ├── middleware/            # JWT Authorization guards
    ├── routes/                # API Endpoints mapping
    ├── utils/                 # Nodemailer email dispatcher
    ├── db.js                  # PostgreSQL pool configuration
    └── server.js              # Server entry point
