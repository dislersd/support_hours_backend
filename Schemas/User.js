data = {
  id: Number,
  username: String,
  password: String,
  email: String,
  createdAt: String,
  role: String,
  blockers: [
    {
      body: String,
      session: Session,
    }
  ],
  sessions: [
    {
      id: Number,
      date: Date,
    }
  ]

}