---
description: Read this file to understand how to fetch data in the project.
<!-- applyTo: **/*.ts, **/*.js -->
---
# Data Fetching Guidelines
This document outlines the guidelines and best practices for fetching data in the project.
Adhering to these guidelines will ensure consistent and efficient data fetching practices across the project.

## 1.  Use server components for data fetching
In next.js, ALWAYS use server components for data fetching whenever possible. 
NEVER use client components for data fetching.

# 2. Data feteching methods
Always use the helper functins in the /data directory. 
NEVER fetch data directly in the components.

All helper functions in the /data directory should be use Drizzle ORM for data base interactions.