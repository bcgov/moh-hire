import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import secureRandomString from 'secure-random-string';

/**
 * Generate a cryptographically secure random number between 0 and maxnumber (exclusive).
 * @param maxnumber - The maximum number (exclusive).
 * @returns A random number between 0 and maxnumber.
 */
function secureRandomNumber(maxnumber: number): number {
  if (maxnumber <= 0) {
    throw new Error('Maxnumber must be greater than 0.');
  }

  const range = 0xffffffff; // Maximum value of a 32-bit unsigned integer
  const maxValidValue = Math.floor(range / maxnumber) * maxnumber - 1; // Avoid bias by setting a rejection threshold

  let randomValue;
  do {
    randomValue = crypto.randomBytes(4).readUInt32BE(0); // Generate a random 32-bit integer
  } while (randomValue > maxValidValue); // Reject values outside the unbiased range

  return randomValue % maxnumber;
}

@Injectable()
export class CaptchaService {
  private readonly hmacKey = process.env.JWT_SECRET || 'your_secret_hmac_key'; // Replace with your secret HMAC key

  generateChallenge() {
    // Choose the maximum random number (complexity)
    const maxnumber = 100_000;

    // Generate a random salt (minimum 10 characters)
    const salt = secureRandomString({ length: 10 }); // Generates a 10-character random string

    // Generate a random secret number between 0 and maxnumber
    const secretNumber = secureRandomNumber(maxnumber);

    // Compute the SHA-256 hash of the concatenated salt and secretNumber
    const challenge = crypto
      .createHash('sha256')
      .update(salt + secretNumber)
      .digest('hex');

    // Create an HMAC signature using the SHA-256 hash and HMAC key
    const signature = crypto.createHmac('sha256', this.hmacKey).update(challenge).digest('hex');

    return {
      algorithm: 'SHA-256',
      challenge,
      maxnumber,
      salt,
      signature,
    };
  }
}
