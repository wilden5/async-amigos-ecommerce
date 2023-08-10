/* eslint-disable no-nested-ternary */
import dotenv from 'dotenv';

dotenv.config();

export const host = process.env.HOST || 'https://auth.europe-west1.gcp.commercetools.com';
export const projectKey = process.env.PROJECT_KEY || 'commercetools-api';
export const clientId = process.env.CLIENT_ID || '05uAYgczsJrIx3uguiJM0Go-';
export const clientSecret = process.env.CLIENT_SECRET || 'eneEZtxyI08K96EiowFmlGv9gVQ1HCVC';
// Исправленный код
export const scopes = [
  'manage_orders:commercetools-api',
  'manage_discount_codes:commercetools-api',
  'manage_my_profile:commercetools-api',
  'manage_my_payments:commercetools-api',
  'manage_api_clients:commercetools-api',
  'manage_customers:commercetools-api',
  'manage_categories:commercetools-api',
  'manage_my_orders:commercetools-api',
  'manage_cart_discounts:commercetools-api',
  'manage_products:commercetools-api',
];
