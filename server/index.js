// mongo paassword = 6i4wKnsCZJMNwoe8
// mongo username = amrit_27

// "mongodb+srv://amrit_27:6i4wKnsCZJMNwoe8@cluster0.wl8o0.mongodb.net/MEMBER?retryWrites=true&w=majority&appName=Cluster0"

require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(
        process.env.MONGODB_URI
    )
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas", err);
    });


const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'active'
    }
});


const User = mongoose.model("users", MemberSchema);


app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const data = await User.create({ name, email, password });
        const member = await data.save();
        res
            .status(200)
            .send({ message: "Member Registered Successfully", id: member._id });
        console.log(member);
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).send({ message: "This email already exists" });
            }
        }
        res.status(500).send({ message: "Something went wrong" });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res
                .status(400)
                .send({ message: "Account not found, Please register first" });
        } else {
            if (user.email === email && user.password === password) {
                res
                    .status(200)
                    .send({ message: "Logged in successfully", id: user._id, role: user.role });
            } else if (user.email === email && user.password !== password) {
                res.status(400).send({ message: "Invalid password" });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

app.post("/adduser", async (req, res) => {
    const { name, email, final_role } = req.body;
    const defaultPassword = "password123";
    try {
        const data = await User.create({ name, email, password: defaultPassword, role: final_role });
        const member = await data.save();
        res
            .status(200)
            .send({ message: `Member Added Successfully. Ask ${name} to change their password`, id: member._id });
        console.log(member);
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).send({ message: "This email already exists. Please try another email" });
            }
        }
        res.status(500).send({ message: "Something went wrong" });
    }
})

app.get("/users", async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        res.status(200).send({ message: "Users retrieved successfully", data: users });
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve users", error: error.message });
    }
});



app.get("/users/:id", async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user); // Send the user data as a response
    } catch (error) {
        res.status(500).send({ message: "Error fetching user details", error: error.message });
    }
});



app.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    if (!data) {
        return res
            .status(400)
            .send({ message: "Member with this id does not exist" });
    }
    console.log(data);
    res.status(200).send({ message: "Member Removed succesfully" });
});


app.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    try {
        const data = await User.findByIdAndUpdate(id, {
            name: name,
            email: email,
            role: role,
            status: status
        });
        if (!data) {
            return res
                .status(400)
                .send({ message: "Member with this id does not exist" });
        }

        res.status(200).send({ message: "Member details edited successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "An error occurred while updating the details" });
    }
});

app.patch("/change_password/:id", async (req, res) => {
    const { id } = req.params;
    const { newPass } = req.body;

    try {
        const data = await User.findByIdAndUpdate(id, {
            password: newPass,
        });
        if (!data) {
            return res
                .status(400)
                .send({ message: "Member with this id does not exist" });
        }

        res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "An error occurred while updating the password" });
    }
});







app.listen(3001, () => {
    console.log("server is running");
});
