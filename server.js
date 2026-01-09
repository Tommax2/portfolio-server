import express from "express";
import cors from "cors";
import { createTransport } from "nodemailer";

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Email configuration
const contactEmail = createTransport({
    service: 'gmail',
    auth: {
        user: "martinsolumi@gmail.com",
        pass: "pkgb hzlc dgkp kpzf"
    },
    tls: {
        rejectUnauthorized: false
    }
});

contactEmail.verify((error) => {
    if (error) {
        console.error("Nodemailer verification failed:", error);
    } else {
        console.log("Nodemailer is ready to send emails");
    }
});

// Contact form endpoint
router.post("/contact", (req, res) => {
    console.log("Received contact request:", req.body);
    
    const { firstname, lastname, email, message, phone } = req.body;
    const name = `${firstname || ''} ${lastname || ''}`.trim() || "Unknown Sender";
    
    const mail = {
        from: "Portfolio Contact Form <martinsolumi@gmail.com>",
        to: "martinsolumi@gmail.com",
        replyTo: email,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ 
                code: 500, 
                status: "Error", 
                message: error.message 
            });
        }
        console.log("Email sent successfully");
        res.json({ code: 200, status: "Message Sent" });
    });
});

// Use router
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
