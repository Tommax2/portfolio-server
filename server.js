import express, { Router, json } from "express";
const router = Router();
import cors from "cors";
import { createTransport } from "nodemailer";

//server used to send emails

const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));


const contactEmail = createTransport({
    service:'gmail',
    auth:{
        user:"martinsolumi@gmail.com",
        pass:"pkgb hzlc dgkp kpzf"

    },
});

contactEmail.verify((error) =>{
    if (error) {
        console.log(error);

    }else{
        console.log("Ready to  Send");
    }
});

router.post("/contact", (req, res) => {
    console.log("Received contact request:", req.body);
    const name = `${req.body.firstname || ''} ${req.body.lastname || ''}`.trim() || "Unknown Sender";
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
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
            res.status(500).json({ code: 500, status: "Error", message: error.message });
        } else {
            console.log("Email sent successfully");
            res.json({ code: 200, status: "Message Sent" });
        }
    });
});
