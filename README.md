# Long Story Short
Long Story Short is a simple and minimalist URL shortener.

## About
- Production link: https://lss99.org
- Built with Vue 3 | Single Page Application (SPA) | Javascript | Composition API
- Hosted as static website in AWS S3, distributed via AWS Cloudfront CDN with custom domain

<img width="800" alt="Screenshot 2025-02-20 at 1 03 26 AM" src="https://github.com/user-attachments/assets/bf8c6687-9630-42c0-8e3c-f8fa8c1d7171" />


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Architecture Diagram
![longstoryshort-backend-dark](https://github.com/user-attachments/assets/a967d08b-be33-489a-8c04-1a9ddebca529)

## Potential Enhancements
- Add logo & change favicon
- Make proxy API request to a separate backend for better security by not exposing the real API endpoint
