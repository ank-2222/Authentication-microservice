import bcrypt from 'bcryptjs';

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds

  // Generate a salt and hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
}