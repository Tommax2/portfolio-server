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

router.post("/contact", (req, res) =>{
    const name = req.body.firstname + req.body.lastname;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from: name,
        to: "martinsolumi@gmail.com",
        subject:" Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</P>
               <p>Phone: ${phone}</P>
               <p>Message: ${message}</p>`

    };
    contactEmail.sendMail(mail, (error) =>{
        if (error) {
            res.json(error);
            console.log(error)

        }else{
            res.json({ code:200, status: "Message Sent"});
        }
    })
} )
