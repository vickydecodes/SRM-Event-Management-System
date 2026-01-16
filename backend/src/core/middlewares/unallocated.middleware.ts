import { Request, Response, NextFunction } from 'express';

export function unallocatedRouteMiddleware(req: Request, res: Response, _next: NextFunction) {
  const acceptsHTML = req.accepts('html');

  const payload = {
    error: 'ROUTE_NOT_ALLOCATED',
    message: 'This route or method is not allowed',
    method: req.method,
    path: req.originalUrl,
  };

  if (acceptsHTML) {
    return res.status(405).send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Route Policy Violation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root {
        --bg: #020617;
        --panel: #020617;
        --border: #1e293b;
        --text: #e5e7eb;
        --muted: #94a3b8;
        --accent: #38bdf8;
        --danger: #ef4444;
      }

      body {
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont;
        background: var(--bg);
        color: var(--text);
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .container {
        max-width: 520px;
        padding: 28px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--panel);
      }

      h1 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--danger);
      }

      p {
        font-size: 14px;
        line-height: 1.6;
        color: var(--muted);
        margin: 0 0 14px;
      }

      .rule {
        padding: 12px;
        border-radius: 8px;
        background: #020617;
        border: 1px solid var(--border);
        font-size: 13px;
        color: var(--text);
      }

      .rule code {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 13px;
      }

      .footer {
        margin-top: 18px;
        font-size: 12px;
        color: var(--muted);
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>Route Policy Violation</h1>

      <p>
        The request you attempted does not comply with the backend route
        allocation policy. This system only accepts requests that are explicitly
        declared and authorized.
      </p>

      <div class="rule">
        Attempted request:
        <br />
        <code>${req.method}</code>
        <code>${req.originalUrl}</code>
      </div>

      <p>
        This endpoint either does not exist or does not allow the requested HTTP
        method. Requests that fall outside the declared contract are rejected by
        design.
      </p>

      <div class="footer">
        If you are a developer, verify the route definition and allowed methods.
        If you are a user, no action is required.
      </div>
    </div>
  </body>
</html>

    `);
  }

  return res.status(405).json(payload);
}
