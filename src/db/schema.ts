import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  real
} from "drizzle-orm/sqlite-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { relations } from "drizzle-orm"


export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image")
})
export type User = typeof users.$inferSelect

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export const workouts = sqliteTable("workouts", {
  id: text("workout_id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  date: integer("date").notNull()
})
export type Workout = Omit<typeof workouts.$inferSelect, "userId">

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}))

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),

  workoutExercises: many(workoutExercises)
}))

export const exercises = sqliteTable("exercises", {
  id: text("exercise_id").notNull().primaryKey(),
  name: text("name")
  // calories per minute
})

export const workoutExercises = sqliteTable("workout_exercises", {
  id: text("workout_exercise_id").primaryKey(),
  workoutId: text("foregin_workout_id").notNull(),
  exerciseId: text("foregin_exercise_id"),
  reps: real("reps") // remove
})

export const workoutExercisesRelations = relations(workoutExercises,
  ({ one, many }) => ({
    workouts: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.id],
    }),
  })
)

export const workoutExerciseSets = sqliteTable("workout_exercises", {
  id: text("set_id").primaryKey(),
  exerciseId: text("foregin_exercise_id"),
  order: integer("order_in_exercise").notNull(),
  details: real("details").notNull()
})
export type ExerciseSet = Omit<typeof workoutExerciseSets.$inferSelect, "id">

