const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// 1. Configure the Transporter (Your Email "Engine")
// RECOMMENDATION: Use an App Password if using Gmail, or use Brevo/SendGrid
const transporter = nodemailer.createTransport({
    service: "gmail", // or 'smtp.brevo.com' for professional use
    auth: {
        user: "your-college-email@gmail.com",
        pass: "YOUR_APP_PASSWORD_HERE" // NOT your normal password
    }
});

// 2. Trigger for Admission Enquiry (listens to 'enquiries' collection)
exports.sendAdmissionEmail = functions.firestore
    .document("enquiries/{docId}")
    .onCreate((snap, context) => {

        const data = snap.data(); // This contains fullName, email, mobile, etc.

        const mailOptions = {
            from: "JEC Website <no-reply@jeccollege.in>",
            to: "admission@jeccollege.in", // Where you want to receive the alert
            subject: `New Admission Enquiry: ${data.fullName}`,
            html: `
        <h2>New Student Inquiry</h2>
        <table style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;">
          <tr><td style="padding:8px;"><strong>Name:</strong></td><td style="padding:8px;">${data.fullName}</td></tr>
          <tr><td style="padding:8px;"><strong>Email:</strong></td><td style="padding:8px;">${data.email}</td></tr>
          <tr><td style="padding:8px;"><strong>Phone:</strong></td><td style="padding:8px;">${data.mobile}</td></tr>
          <tr><td style="padding:8px;"><strong>Course:</strong></td><td style="padding:8px;">${data.level} - ${data.program}</td></tr>
          <tr><td style="padding:8px;"><strong>City/State:</strong></td><td style="padding:8px;">${data.city}, ${data.state}</td></tr>
        </table>
      `
        };

        return transporter.sendMail(mailOptions)
            .then(() => console.log("Admission Email Sent!"))
            .catch((err) => console.error("Error sending email:", err));
    });

// 3. Trigger for General Contact (We will need to update Contact.js to use this)
exports.sendContactEmail = functions.firestore
    .document("contacts/{docId}")
    .onCreate((snap, context) => {

        const data = snap.data();

        const mailOptions = {
            from: "JEC Website <no-reply@jeccollege.in>",
            to: "jeckukas@yahoo.com",
            subject: `General Inquiry: ${data.name}`,
            html: `
        <h3>New Message from Contact Page</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `
        };

        return transporter.sendMail(mailOptions);
    });