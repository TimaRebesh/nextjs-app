'use server';
import { signIn, signOut } from '@lib/auth';
import { connectToDb } from './utils';
import { User } from './models';

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

export const register = async (formData: FormData) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return 'Password do not match';
  }

  try {
    connectToDb();
    const user = await User.findOne({ username });
    if (user) {
      return "Username already exists. Please choose another name";
    }
    const newUser = new User({
      username,
      email,
      password,
      img
    });
    await newUser.save();
    console.log('new user is created in db');
  } catch (e) {
    return { error: 'Something went wrong' };
  }
};