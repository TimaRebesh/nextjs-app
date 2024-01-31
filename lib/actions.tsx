'use server';
import { signIn, signOut } from '@lib/auth';

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