import * as https from 'https';
import { CognitoUserPoolTriggerEvent } from 'aws-lambda';

export const authToken = async (
  event: CognitoUserPoolTriggerEvent,
  _context: any,
  callback: any,
) => {
  const URL =
    'https://53ph0bulw2.execute-api.ap-south-1.amazonaws.com/dev/user/email/' +
    event.request.userAttributes.email;
  let error = null;
  await new Promise((resolve, reject) => {
    https
      .get(URL, res => {
        let buffer = '';
        res.on('data', chunk => (buffer += chunk));
        res.on('end', () => {
          const result = JSON.parse(buffer);
          if (result.length <= 0) {
            error = new Error('User Not Found');
          } else {
            event = {
              ...event,
              response: {
                claimsOverrideDetails: {
                  claimsToAddOrOverride: {
                    organization: result[0].organizationId,
                    userId: result[0].id,
                  },
                },
              },
            };
          }
          resolve(JSON.parse(buffer));
        });
      })
      .on('error', e => {
        reject(e);
      });
  });

  if (error) {
    const setUser = await new Promise((resolve, reject) => {
      const data = JSON.stringify({
        firstName: event.request.userAttributes.given_name,
        lastName: event.request.userAttributes.family_name,
        email: event.request.userAttributes.email,
      });
      const options = {
        hostname: '53ph0bulw2.execute-api.ap-south-1.amazonaws.com',
        port: 443,
        path: '/dev/authTrigger/user/',
        method: 'POST',
      };
      const req = https.request(options, res => {
        res.on('data', d => {
          process.stdout.write(d);
        });
      });
      req.on('error', e => {
        reject(e);
      });
      req.on('finish', () => {
        resolve();
      });
      req.write(data);
      req.end();
    });
    const updateEvent = await new Promise((resolve, reject) => {
      https
        .get(URL, res => {
          let buffer = '';
          res.on('data', chunk => (buffer += chunk));
          res.on('end', () => {
            const result = JSON.parse(buffer);
            event = {
              ...event,
              response: {
                claimsOverrideDetails: {
                  claimsToAddOrOverride: {
                    organization: result[0].organizationId,
                    userId: result[0].id,
                  },
                },
              },
            };
            resolve(JSON.parse(buffer));
          });
        })
        .on('error', e => {
          reject(e);
        });
    });
    await Promise.all([setUser, updateEvent]);
    error = null;
  }
  callback(error, event);
};
