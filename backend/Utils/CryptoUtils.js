import Crypto from "crypto-js";
import debugLogger from "../Utils/DebugLogger.js";

const SECRET_KEY = process.env.DE_ENCRYPT_KEY;

function getHashedKey() {
  return Crypto.SHA256(SECRET_KEY);
}

export function encryptWithRandomIV(value) {
  try {
    const iv = Crypto.lib.WordArray.random(16);
    const encrypted = Crypto.AES.encrypt(value, getHashedKey(), {
      iv: iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });

    return `${iv.toString(Crypto.enc.Base64)}:${encrypted.toString()}`;
  } catch (err) {
    debugLogger.error("Error while trying to encrypt with random IV: \n" + err);
    return false;
  }
}

export function encryptWithFixedIV(value) {
  try {
    const fixedIV = Crypto.SHA256(getHashedKey())
      .toString(Crypto.enc.Hex)
      .substring(0, 32);
    const iv = Crypto.enc.Hex.parse(fixedIV);

    const encrypted = Crypto.AES.encrypt(value, getHashedKey(), {
      iv: iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });

    return `${Crypto.enc.Base64.stringify(iv)}:${encrypted.toString()}`;
  } catch (err) {
    debugLogger.error("Error while trying to encrypt with fixed IV: \n" + err);
    return false;
  }
}

export function decrypt(value) {
  try {
    const parts = value.split(":");
    const iv = Crypto.enc.Base64.parse(parts[0]);
    const encryptedData = parts[1];

    const decrypted = Crypto.AES.decrypt(encryptedData, getHashedKey(), {
      iv: iv,
      mode: Crypto.mode.CBC,
      padding: Crypto.pad.Pkcs7,
    });

    return decrypted.toString(Crypto.enc.Utf8);
  } catch (err) {
    debugLogger.error("Error while trying to decrypt: \n" + err);
    return false;
  }
}

export function hashString(value) {
  try {
    return Crypto.SHA256(value).toString(Crypto.enc.Hex);
  } catch (err) {
    debugLogger.error("Error while trying to hash a password: \n" + err);
    return false;
  }
}
