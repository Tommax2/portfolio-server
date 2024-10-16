const express =require("express");
const router = express.Router();
const cors = require("cors")
const createTransporter = require("nodemailer").createTransport

//server used to send emails

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));


const contactEmail = createTransporter({
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