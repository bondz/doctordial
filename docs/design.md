# Doctordial design

REST API document describing the routes

- `POST /signup` - Signup a user. Patient or doctor
- `POST /login` - Login a user who has previously signed up.
- `DELETE /doctor/:id` - Allow patient to remove a doctor from his list
- `POST /doctor` - Allow patient to add a doctor to his list
- `GET /doctor/:id/list` - View a doctor's list
- `GET /patient/:id/list` - View a patient's list
- `POST /patient/:id/block` - Block a patient
- `POST /question` - Create a question
- `GET /questions` - View all questions
- `POST /question/:id` - Create an answer
- `GET /question/:id` - View an answer
