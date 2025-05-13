export function getCredentials(text: string): string {
    if (text.startsWith('env:')) {
      const credential = process.env[text.replace('env:', '')];
      if (!credential) {
        throw new Error(`Environment variable is not defined`);
      }
      return credential;
    }
    return text;
  }