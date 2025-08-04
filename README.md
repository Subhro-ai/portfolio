# Subhrajyoti Singha - Personal Portfolio

Welcome to the repository for my personal portfolio website. This project is a dynamic, single-page application designed to showcase my skills, projects, and professional background in a visually engaging and interactive way. It features a modern design, smooth animations, and a fully functional contact form.


### [View Live Demo](https://www.linkedin.com/in/subhrajyoti-singha-b243082a3/) <!-- TODO: Add your live URL here -->

---

## ✨ Features

- **Stunning Animations:** Built with GSAP (GreenSock Animation Platform), the site features fluid, scroll-based animations that guide the user through each section.
- **Hero Section:** An immersive, full-screen hero section with animated text and dynamic, flowing blobs.
- **About Me:** A clean and clear introduction to my background, skills, and interests.
- **Skills Showcase:** An interactive section that highlights my technical skills, categorized for clarity.
- **Horizontal Scrolling Projects:** A professional, horizontally scrolling gallery of my key projects, triggered by vertical scrolling. Each project card includes a description and links to GitHub and the live site.
- **Functional Contact Form:** A sleek, fully operational contact form that sends emails directly to my inbox via a custom Node.js backend.
- **Light & Dark Mode:** A toggleable theme to switch between light and dark modes, with a custom-designed PrimeNG theme.
- **Fully Responsive:** The entire website is designed to be fully responsive, providing an optimal viewing experience on all devices, from mobile phones to desktops.

---

## 🛠️ Tech Stack

This project is built with a modern and powerful tech stack:

- **Frontend:**
  - **Angular** (v19+)
  - **PrimeNG** (v19+) for UI components
  - **GSAP (GreenSock)** for all animations
  - **TypeScript**
  - **CSS** with custom variables for theming

- **Backend (Contact Form):**
  - **Node.js**
  - **Express.js**
  - **Nodemailer** for sending emails
  - **CORS** for cross-origin requests

- **Deployment:**
  - **Frontend:** Firebase Hosting
  - **Backend:** Render

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.io/cli)

### Installation & Setup

1.  **Clone the Frontend Repository:**
    ```sh
    git clone [https://github.com/your-username/your-portfolio-repo.git](https://github.com/your-username/your-portfolio-repo.git)
    cd your-portfolio-repo
    ```

2.  **Install Frontend Dependencies:**
    ```sh
    npm install
    ```

3.  **Run the Frontend Development Server:**
    ```sh
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

4.  **Set Up the Backend (Optional - for Contact Form):**
    - Clone the backend repository (you'll need to create one for the `portfolio-backend` folder).
    - Install dependencies: `npm install`.
    - Create a `.env` file and add your `EMAIL_USER` and `EMAIL_PASS` (Google App Password).
    - Run the server: `node server.js`.
    - Make sure the `backendEndpoint` in `contact.component.ts` points to `http://localhost:3000/send`.

---

## 📦 Deployment

### Frontend (Firebase)

1.  **Build the application:**
    ```sh
    ng build
    ```
2.  **Deploy to Firebase Hosting:**
    ```sh
    firebase deploy --only hosting
    ```

### Backend (Render)

1.  Push the backend code to its own GitHub repository.
2.  Create a new "Web Service" on Render and connect it to the repository.
3.  Use the following settings:
    - **Runtime:** `Node`
    - **Build Command:** `npm install`
    - **Start Command:** `node server.js`
4.  Add your `EMAIL_USER` and `EMAIL_PASS` as Environment Variables in the Render dashboard.
5.  Deploy the service and update the `backendEndpoint` in your Angular `contact.component.ts` with the new live URL.
6.  Re-deploy the frontend to Firebase to apply the backend URL change.

---

## 📬 Contact

Subhrajyoti Singha

- **GitHub:** [@Subhro-ai](https://github.com/Subhro-ai)
- **LinkedIn:** [your-linkedin-profile](https://linkedin.com/in/your-linkedin) <!-- TODO: Add your LinkedIn URL -->