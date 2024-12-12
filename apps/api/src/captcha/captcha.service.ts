import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import secureRandomString from 'secure-random-string'; // ES module import

@Injectable()
export class CaptchaService {
  private readonly hmacKey = process.env.JWT_SECRET || 'your_secret_hmac_key'; // Replace with your secret HMAC key

  generateChallenge() {
    // Choose the maximum random number (complexity)
    const maxnumber = 100_000;

    // Generate a random salt (minimum 10 characters)
    const salt = secureRandomString({ length: 10 }); // Generates a 10-character random string

    // Generate a random secret number between 0 and maxnumber
    const secretNumber = Math.floor(Math.random() * maxnumber);

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
