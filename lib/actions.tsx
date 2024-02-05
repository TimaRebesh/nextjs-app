'use server';
import { signIn, signOut } from '@lib/auth';
import { connectToDb } from './utils';
import { User } from './models';
import bcrypt from "bcryptjs";

export const sayHello = async () => {
  console.log('hello');
  return { some: 'hello ' };
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
      return { error: 'Invalid user or password' };
    }
    return { error: "Error until login" };
  }

};