function authTemplate(user, password) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your account information</title>
      </head>
      <body
        style="
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #0b1a24;
          color: #e0f0f4;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="min-height: 100vh; background-color: #0b1a24"
        >
          <tr>
            <td align="center" valign="middle" style="padding: 20px">
              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 600px;
                  background: rgba(147, 245, 235, 0.03);
                  border-radius: 15px;
                  border: 1px solid #3aa6a0;
                "
              >
                <tr>
                  <td style="padding: 40px; text-align: center">
                    <div style="margin-bottom: 30px">
                      <h1 style="color: #307aa7; margin: 0; font-size: 32px">
                        ElectusIA
                      </h1>
                    </div>

                    <h2 style="color: #e0f0f4; margin: 0 0 30px 0; font-size: 24px">
                      Your account information:
                    </h2>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="margin-bottom: 30px"
                    >
                      <tr>
                        <td>
                          <div style="margin-bottom: 20px; text-align: left">
                            <label
                              style="
                                display: block;
                                color: #e0f0f4;
                                font-weight: bold;
                                margin-bottom: 8px;
                                font-size: 16px;
                              "
                              >User:</label
                            >
                            <div
                              style="
                                background: rgba(22, 22, 22, 0.3);
                                border: 1px solid #3aa6a0;
                                border-radius: 8px;
                                padding: 12px;
                                color: #ffffff;
                                font-size: 16px;
                                font-family: monospace;
                              "
                            >
                              ${user}
                            </div>
                          </div>

                          <div style="margin-bottom: 20px; text-align: left">
                            <label
                              style="
                                display: block;
                                color: #e0f0f4;
                                font-weight: bold;
                                margin-bottom: 8px;
                                font-size: 16px;
                              "
                              >Password:</label
                            >
                            <div
                              style="
                                background: rgba(22, 22, 22, 0.3);
                                border: 1px solid #3aa6a0;
                                border-radius: 8px;
                                padding: 12px;
                                color: #ffffff;
                                font-size: 16px;
                                font-family: monospace;
                              "
                            >
                              ${password}
                            </div>
                            <div style="margin-top: 30px">
                                <p style="color: #42a730ff; margin: 0; font-size: 16px">
                                    You can change your password once you've logged into your account.
                                </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a
                            href="${process.env.WEB_URL}/login"
                            style="
                              display: inline-block;
                              background: rgba(22, 22, 22, 0.3);
                              border: 2px solid #3aa6a0;
                              border-radius: 8px;
                              padding: 15px 30px;
                              color: #ffffff;
                              text-decoration: none;
                              font-weight: bold;
                              font-size: 18px;
                              transition: all 0.3s ease;
                            "
                          >
                            Login
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 20px;
                      text-align: center;
                      border-radius: 0 0 15px 15px;
                      border-top: 1px solid #3aa6a0;
                    "
                  >
                    <strong style="color: #307aa7">&copy; ElectusIA</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  return htmlContent;
}

export default authTemplate;
