export const loginEmail = ({ email, url }: { email: string; token: string; url: string }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
    </head>
    <body style="background-color: #ffffff; font-family: 'Cormorant Garamond', serif; padding: 40px 0; margin: 0;">
      <table align="center" width="100%" role="presentation" style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);">
        <tr>
          <td style="text-align: center;">
            <h1 style="font-size: 32px; font-weight: 600; letter-spacing: 2px; margin: 0 0 10px 0; color: rgb(37 37 37); font-family: 'Cormorant Garamond', serif;">
              18 | 04 | 2026
            </h1>
            <h2 style="font-size: 28px; font-weight: 400; margin: 0 0 40px 0; color: rgb(37 37 37); font-family: 'Cormorant Garamond', serif;">
              Jana &amp; Philipp
            </h2>
            <div style="margin: 40px 0;">
              <a href="${url}" target="_blank" style="display: inline-block; background: rgb(52 52 52); color: rgb(251 251 251); padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 18px; font-weight: 500; font-family: 'Cormorant Garamond', serif; transition: background-color 0.2s;">
                Anmelden
              </a>
            </div>
            <p style="font-size: 16px; color: rgb(82 82 82); margin: 30px 0 0 0; line-height: 1.5; font-family: 'Cormorant Garamond', serif;">
              Falls du diesen Link nicht angefordert hast, kannst du diese E-Mail einfach ignorieren.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};
