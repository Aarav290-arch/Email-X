Live demo: (https://reliable-mochi-834a46.netlify.app/)
# Mass Mail Dispatcher (Email-X)

Mass Mail Dispatcher is a lightweight, client-side utility for preparing personalized bulk emails from a CSV of recipients and a message template. It is distributed as a static frontend (HTML, CSS, JS) and does not include any server-side sending component — you use your own mail client, SMTP server, or email API to actually deliver messages.

Key ideas
- Load a CSV that contains recipient rows (name, email, and optional fields).
- Define a message template with simple placeholders (for example `{{name}}`).
- Preview personalized messages per recipient.
- Export or copy prepared message content for use with your mail client or a sending API.

Files in this project
- `index.html` — the user interface used to load CSVs and compose/preview messages.
- `main.js` — client-side logic for parsing CSV, applying templates, and rendering previews.
- `style.css` — UI styles.
- `BULKEMAIL2.csv` — example CSV of recipients included for testing.

Quick usage
1. Open `index.html` in a modern browser (double-click or serve the folder).
2. Use the UI to upload a CSV (or open `BULKEMAIL2.csv`).
3. Enter a subject and message template. Use placeholders that match CSV column headers (e.g., `{{first_name}}`).
4. Preview generated messages to verify personalization.
5. Copy/export the generated messages and send them using your preferred delivery method (mail client, SMTP program, or an email API).

Security & privacy
- CSV files may contain personal data (email addresses, names). Keep them private and do not commit sensitive data to public repositories.
- This project does not store or transmit data to a remote server. If you integrate with an API or back end, secure credentials (API keys, SMTP passwords) must never be committed to source control.

Limitations
- The project is a client-side preparation tool only; it does not send emails by itself.
- Large recipient lists may be limited by your mail client or browser memory when previewing/exporting.

If you need server-side sending or an automated delivery pipeline, consider integrating with a backend/service (SMTP server, SendGrid, Amazon SES, etc.) and ensure you follow rate limits and anti-spam regulations.




