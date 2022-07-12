import { HttpStatus } from '@nestjs/common';
import * as bycrpt from 'bcrypt';
import https from 'https';
import envVariables from '../config';
const { paystackSecretKey, paystackBaseUrl } = envVariables;

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const jsonSuccess = (
  data: any = null,
  message: string = 'Success.',
  status: number = HttpStatus.OK,
) => {
  return {
    status,
    message,
    data,
  };
};

export const hashPassword = async (
  plaintextPassword: string,
): Promise<string> => {
  return bycrpt.hash(plaintextPassword, 10);
};

export const verifyPassword = (
  plaintextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bycrpt.compare(plaintextPassword, hashedPassword);
};

export const payViaPaystack = async (
  email: string,
  amount: number,
): Promise<any> => {
  const params = JSON.stringify({
    email: email,
    amount: amount * 100,
  });

  const options = {
    hostname: paystackBaseUrl,
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      'Content-Type': 'application/json',
    },
  };

  return makeRequest(options, params);
};

export const verifyPaystackPayment = async (reference: string) => {
  const options = {
    hostname: paystackBaseUrl,
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
    },
  };

  return makeRequest(options);
};

/**
 * .
 *
 * @param {Object} options
 * @param {Object | string} data
 * @return {Promise} a promise of request
 */
const makeRequest = (
  options: object,
  data: object | string = '',
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data !== '') {
      req.write(data);
    }

    req.end();
  });
};
