# osplusstudio.com

Static website of OSplusstudio and its products: QRoket, MuslimPlus and Nestor.

| Path | Page |
|---|---|
| `/` | Studio home page |
| `/gizlilik.html` | Studio privacy policy |
| `/qrocket/` | QRoket landing page and pilot sign-up form |
| `/muslimplus/` | MuslimPlus landing page and privacy policy |
| `/nestor/` | Nestor landing page, waitlist, privacy and support |

Plain HTML and CSS, no build step. Deploy the repository root as-is (Netlify, Cloudflare Pages or GitHub Pages).

Exception: `/muslimplus/` is the built output of the separate MuslimPlus React project (the `Website` folder, github.com/nestoorapp/Muslimplus_website). To update it, run `npx vite build --base=./` there and copy the output into `muslimplus/`, keeping `muslimplus/gizlilik.html`.

The QRoket pilot form and the Nestor waitlist use Netlify Forms: turn on **Forms → Form detection** in Netlify and redeploy once.
