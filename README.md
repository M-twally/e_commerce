# E-Commerce API

A REST API for an online shop ("noon"): catalog, cart, coupons, reviews and **Stripe checkout** with a webhook that creates the order.

## Features

- Catalog: categories, sub-categories, brands and products with image upload (**Cloudinary**)
- Auth with JWT, email confirmation and password hashing
- Cart, wishlist, addresses and coupons
- Reviews
- Orders with **Stripe** checkout session and webhook (`POST /webhook`)
- Request validation with Joi, slugs with `slugify`

## Tech stack

- Node.js, Express 4
- MongoDB with Mongoose 7
- JWT, bcrypt, crypto-js
- Stripe, Cloudinary, Multer
- Joi, Nodemailer, morgan

## API modules

Base URL: `http://localhost:5000`

| Route prefix | Purpose |
|---|---|
| `/api/auth` | Sign up and sign in |
| `/api/users` | User account |
| `/api/categories` | Categories |
| `/api/Subcategories` | Sub-categories |
| `/api/brands` | Brands |
| `/api/products` | Products |
| `/api/reviews` | Reviews |
| `/api/whishlist` | Wishlist |
| `/api/address` | Addresses |
| `/api/coupon` | Coupons |
| `/api/cart` | Cart |
| `/api/order` | Orders and checkout |
| `/webhook` | Stripe webhook (raw body) |

## Project structure

```
├── index.js            # app entry point
├── DB/
│   ├── connection.js   # database connection
│   └── models/         # data models
└── src/
    ├── index.router.js # mounts all modules
    ├── middleware/     # authentication, validation
    ├── modules/        # one folder per feature (router + controller)
    └── utils/          # email, error handling, helpers
```

## Getting started

**Requirements:** Node.js 18+ and a running database (see the environment variables below).

```bash
npm install
# create a .env file with the variables below
npm start
```

## Environment variables

Create a `.env` file in the project root (never commit it):

```env
PORT=
BASE_URL=
DB_ONLINE=
SALT_ROUND=
TOKEN_SIGNATURE=
SIG_SECRET=
CART_SIGNATURE=
EMAIL=
EMAIL_PASSWORD=
CLOUD_NAME=
API_KEY=
API_SECRET=
STRIPE_KEY=
```

## Screenshots

See the [`photos/`](photos) folder for sample requests and responses.

## Notes

- Requests are validated before they reach the controllers, and errors go through a central error handler.
- Protected routes need a valid token from the sign-in endpoint.
