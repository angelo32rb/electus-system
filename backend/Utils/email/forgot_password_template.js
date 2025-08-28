function forgotPasswordTemplate(username, token) {
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Change Password Request</title>
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
                        background: rgba(71, 122, 117, 0.03);
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
                            You might have requested a password change:
                            </h2>

                            <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center">
                                <a
                                    href="${process.env.WEB_URL}/reset-password?username=${username}&token=${token}"
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
                                    Change Password
                                </a>
                                </td>
                            </tr>
                            </table>
                            <div style="margin-top: 30px">
                                <p style="color: #a73030; margin: 0; font-size: 16px">
                                    If you haven't request a password changing, please ignore
                                    this e-mail.
                                </p>
                            </div>
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

export default forgotPasswordTemplate;
