export default function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#";

  const length = Math.floor(Math.random() * (16 - 10 + 1)) + 10;
  let password = "";

  for (let i = 0; i < length; i++) {
    const charIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(charIndex);
  }

  return password;
}
