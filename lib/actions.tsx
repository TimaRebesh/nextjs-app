'use server';
import { signIn, signOut } from '@lib/auth';
import { connectToDb } from './utils';
import { Post, User } from './models';
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";


export const addPost = async (previousState: any, formData: FormData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);
  console.log(title, desc, slug, userId);

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
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData: FormData) => {
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

export const addUser = async (previousState: any, formData: FormData) => {
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

export const deleteUser = async (formData: FormData) => {
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

export const handleGitHubLogin = async () => {
  await signIn('github');
};

export const handleLogOut = async () => {
  await signOut();
};

export const register = async (previousState: any, formData: FormData) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: 'Password do not match' };
  }

  try {
    connectToDb();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists. Please choose another name" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img
    });
    await newUser.save();
    console.log('new user is created in db');
    return { success: true };
  } catch (e) {
    return { error: 'Something went wrong' };
  }
};

export const login = async (previousState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    connectToDb();
    const user = await User.findOne({ username });
    if (!user) {
      return { error: "Username is not exist" };
    }

    await signIn("credentials", {
      username,
      password
    });

  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }

};