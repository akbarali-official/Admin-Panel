# Dashboard Backend (Express + MongoDB)

## Chalane ke steps
1. `npm install`
2. `.env` mein MONGO_URI check karo (local MongoDB ya Atlas)
3. `npm run seed`   -> demo data + admin user
4. `npm run dev`    -> server http://localhost:5000

Admin login: admin@dashboard.com / admin123

## API list
| Method | URL | Access | Kaam |
|---|---|---|---|
| GET | /api/health | public | server check |
| POST | /api/auth/register | public | naya user |
| POST | /api/auth/login | public | login, token milta hai |
| GET | /api/auth/me | login | apni profile |
| GET | /api/dashboard?orderRange=year\|month | public | saare cards ka data |
| GET | /api/earnings, /orders, /income, /growth, /stocks | public | list |
| GET | /api/<resource>/:id | public | ek record |
| POST | /api/<resource> | admin | naya record |
| PUT | /api/<resource>/:id | admin | update |
| DELETE | /api/<resource>/:id | admin | delete |

Admin routes ke liye header: `Authorization: Bearer <token>`
