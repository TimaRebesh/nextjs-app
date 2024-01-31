export const sayHello = async () => {
  'use server';
  console.log('hello');
  return { some: 'hello ' };
};