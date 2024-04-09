"use server";

import { revalidatePath } from "next/cache";
import { Job, JobTracking, Post, Shipping, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState,formData) => { //all server component use async
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog"); // as soon as we manage to push a blog we revalidate the path
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState,formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

// here will add more actions including to post a requested for translation story, narrative alignement, shipping, plus job listing, confirming, updating,and deleting


export const getJobs = async () => {
  try {
    connectToDb();
    const allJobs = await Job.find()
      .populate('category')
      .populate('bookedBy', 'username');
    return allJobs;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


export const deleteJob = async (prevState, formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    const deletedJob = await Job.findByIdAndDelete(id);
    await JobTracking.deleteOne({ jobId: deletedJob._id });

    revalidatePath("/admin"); // Revalidate the admin page
    return "Job deleted successfully";
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


export const getAllShippingRequests = async (filters = {}) => {
  try {
    connectToDb();

    // Apply filtering
    let filterQuery = {};
    if (filters.status) {
      filterQuery.status = filters.status;
    }
    if (filters.userId) {
      filterQuery.userId = filters.userId;
    }

    const shippingRequests = await Shipping.find(filterQuery)
      .populate('packageType');

    return shippingRequests;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteShippingRequest = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Shipping.findByIdAndDelete(id);

    revalidatePath("/admin"); // Update the admin page
    return "Shipping request deleted successfully";
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
