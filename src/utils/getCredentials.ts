export function getCredentials(userKey: string): { email: string; password: string } {

  const email = process.env[`${userKey}_EMAIL`];
  const password = process.env[`${userKey}_PASSWORD`];

  if (!email) {
    throw new Error(`Environment variable "${userKey}_EMAIL" is not defined`);
  }

  if (!password) {
    throw new Error(`Environment variable "${userKey}_PASSWORD" is not defined`);
  }

  return { email, password };
}
