
'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { LoginSchema, SignupSchema } from './schemas';

// Replace with your actual database client and user model
// For example, using Prisma:
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function signupUser(values: z.infer<typeof SignupSchema>): Promise<ActionResult> {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid fields. Please check your input.' };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // TODO: Check if user with this email or username already exists in the database
    // Example:
    // const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    // if (existingUserByEmail) {
    //   return { success: false, error: 'An account with this email already exists.' };
    // }
    // const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    // if (existingUserByUsername) {
    //   return { success: false, error: 'This username is already taken.' };
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentTime = new Date();

    // TODO: Save the new user to your database
    // Example:
    // await prisma.user.create({
    //   data: {
    //     username,
    //     email,
    //     password: hashedPassword,
    //     lastLoginTime: currentTime, // Or null if login is separate
    //     // any other fields like businessName
    //   },
    // });

    console.log('Placeholder: User signed up successfully', { username, email, lastLoginTime: currentTime });
    // Optionally, log the user in immediately and create a session


    // For this placeholder, we'll just return success.
    // In a real app, you might redirect or send a verification email.
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: 'An unexpected error occurred during signup.' };
  }

  // Redirect to login page after successful signup
  // This redirect should ideally happen on the client after toast, or handled by the auth provider.
  // For server action, you can call redirect(), but it must be outside try/catch
  // redirect('/login'); // This would throw if not careful with try/catch
  return { success: true };
}

export async function loginUser(values: z.infer<typeof LoginSchema>): Promise<ActionResult> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid email or password format.' };
  }

  const { email, password } = validatedFields.data;

  try {
    // TODO: Retrieve user from the database by email
    // Example:
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user || !user.password) {
    //   return { success: false, error: 'Invalid email or password.' };
    // }

    // const passwordsMatch = await bcrypt.compare(password, user.password);
    // if (!passwordsMatch) {
    //   return { success: false, error: 'Invalid email or password.' };
    // }

    // TODO: Update lastLoginTime in the database
    // const currentTime = new Date();
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { lastLoginTime: currentTime },
    // });
    
    // TODO: Implement session management (e.g., create a session cookie)
    // This is where you'd use a library like next-auth, lucia-auth, or iron-session

    console.log('Placeholder: User logged in successfully', { email });
    // If login is successful, redirect to the modules page.
    redirect('/modules'); 
    // Note: redirect() throws an error, so code after it in this try block won't run.
  } catch (error: any) {
    // Check if the error is a Next.js redirect error
    if (typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw the redirect error so Next.js can handle it
    }

    // If it's not a redirect error, then it's an actual login process error
    console.error('Login error (non-redirect):', error);
    return { success: false, error: 'An unexpected error occurred during login.' };
  }
  
  // This line won't be reached if redirect() is called successfully within the try block.
  // It's here for type correctness if redirect was conditional and didn't happen.
  // However, in the current logic, redirect() always throws if login details are valid.
  // return { success: true }; // Effectively unreachable in the current success path
}
