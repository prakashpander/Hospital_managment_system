import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
        return next(new ErrorHandler("Please Fill Full Form !", 400));
    };

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User Already Register !", 400));
    }

    user = await User.create({
        firstName, lastName, email, phone, dob, gender, password, role
    });

    generateToken(user, "User Register Successfully", 200, res);

});

export const login = catchAsyncErrors(async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Details !", 400));
    };

    if (password !== confirmPassword) {
        return next(new ErrorHandler("password And confirmPassword Don't Match !", 400));
    };

    const user = await User.findOne({ email }).select("+password");
      console.log("User Found: ", user);   // ye line extra add ki h 
      console.log("Backend User Found:", user);  // ye line extra add ki h 

    if (!user) {
        return next(new ErrorHandler("Invalid Password And Email !", 400));
    };

    const isPasswordMatched = await user.comparePassword(password);
     console.log("Password Match Status: ", isPasswordMatched); // ye line extra add ki h 

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password Or Email !", 400))
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found !", 400));
    };
    console.log("Sending Response User:", user);  // ye line extra add ki h 

    generateToken(user, "User Logged In Successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { firstName, lastName, email, phone, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    };

    let isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} Already Registered!`, 400));
    };

    const admin = await User.create({ firstName, lastName, email, phone, dob, gender, password, role: "Admin" });

    res.status(200).json({
        success: true,
        message: "User created Successfully",
    });
});

export const getAllDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out Successfully"
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged out Successfully"
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avtar Required", 400));
    };

    const { docAvatar } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Support !", 400))
    }

    const { firstName, lastName, email, phone, dob, gender, password, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please Fill Full Form !", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role}User Is Already Registered With This Email !`, 400));
    };


    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("cloudinary Error !", cloudinaryResponse.error || "Unknown cloudinary Error");
            return next(new ErrorHandler("Cloudinary upload failed!", 500));
    };

    const doctor = await User.create({
        firstName, lastName, email, phone, dob, gender, password, doctorDepartment, role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor
    });
});
