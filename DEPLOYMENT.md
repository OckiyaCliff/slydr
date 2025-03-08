# Slydr Deployment Guide

This guide will help you deploy Slydr to production and onboard real users.

## Prerequisites

- Vercel account for deployment
- Supabase account for database
- Solana wallet for testing
- Environment variables set up

## Step 1: Clean Up Test Data

Before deploying to production, you should clean up any test data:

```bash
# Run the cleanup script
npx ts-node -r dotenv/config scripts/cleanup-test-data.ts

