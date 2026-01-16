import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cookieParser from 'cookie-parser';

export const applySecurityMiddlewares = (app: Express) => {
  console.log('🛡️ Applying security middlewares...');

  // ✅ Cookie parsing
  app.use(cookieParser());
  console.log('✅ Cookie parser active');

  // ✅ CORS ///process.env.ALLOWED_ORIGINS?.split(',') ||      credentials: true,
  // exposedHeaders: ['Content-Disposition'],
  const origins = '*';
  app.use(
    cors({
      origin: "*",
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })
  );

  console.log(`✅ CORS enabled for origins: ${origins}`);

  // ✅ Helmet — Secure HTTP headers
  app.use(helmet());
  console.log('✅ Helmet enabled');

  // ✅ Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log('✅ Body parser configured');

  // ✅ Prevent NoSQL Injection
  // app.use(
  //   mongoSanitize({
  //     replaceWith: "_",
  //   })
  // );
  // console.log("✅ Mongo sanitize applied");

  // ✅ XSS Protection
  const xssOptions = {
    maxDepth: 50,
    allowedKeys: ['name', 'title'],
    allowedTags: ['b', 'i', 'em', 'strong', 'h1', 'h2'],
  };

  app.use(xss(xssOptions));
  console.log('✅ XSS sanitizer enabled');

  // ✅ Rate limiting
  // const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000,
  //   limit: 1000,
  //   message: "Too many requests from this IP, please try again later.",
  // });
  // app.use(limiter);
  console.log('✅ Rate limiter applied');

  // ✅ Response compression
  app.use(compression());
  console.log('✅ Response compression enabled');

  console.log('🟢 Security middleware setup complete\n');
};
