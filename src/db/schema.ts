import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  real
} from "drizzle-orm/sqlite-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { relations } from "drizzle-orm"


/* Accounts tables */
export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image")
})
export type User = typeof users.$inferSelect
export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}))

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

/* Exercise info  */
export const exercises = sqliteTable("exercises", {
  id: text("exercise_id").notNull().primaryKey(),
  name: text("name")
  // calories per minute
  // muscle group
})


/* Workouts */
export const workouts = sqliteTable("workouts", {
  id: integer("workout_id").primaryKey(),
  userId: text("user_id").notNull(),
  date: integer("date").notNull()
})
export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),

  workoutExercises: many(workoutExercises)
}))


/* Workout exercises */
export const workoutExercises = sqliteTable("workout_exercises", {
  id: integer("workout_exercise_id").primaryKey(),
  workoutId: integer("foreign_workout_id").notNull(),
  exerciseId: text("foreign_exercise_id").notNull(),
})
export const workoutExercisesRelations = relations(workoutExercises,
  ({ one, many }) => ({
    workout: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.id],
    }),

    workoutSets: many(workoutSets)
  })
)

export const workoutSets = sqliteTable("workout_sets", {
  id: integer("set_id").primaryKey(),
  workoutExerciseId: integer("workout_exercise_id").notNull(),
  order: integer("order_in_workout").notNull(),
  details: real("set_details").notNull()
})
export const workoutSetRelations = relations(workoutSets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [workoutSets.workoutExerciseId],
    references: [workoutExercises.id]
  })
}))
export type WorkoutSet = typeof workoutSets.$inferSelect
export type InsertWorkoutSet = typeof workoutSets.$inferInsert