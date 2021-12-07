# EHPR Hiring Portal

## Front End

### Local API communication

In order to make successful requests from the web application to the APi you'll need to an appropriate value to
the `NEXT_PUBLIC_API_URL` environment variable. This is filled by default when using docker but if you're running
the application on it's own you can supply this value by creating a file named `.env.local` placed in `apps/web`.

ie: 
```
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```
