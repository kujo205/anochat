// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm';
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `anochat_${name}`);



export const user=mysqlTable('user',{
    id:bigint('id',{mode:'number'}).primaryKey().autoincrement(),
    name:varchar('name',{length:256}).notNull(),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt:timestamp('updated_at').onUpdateNow(),
})


export const userRelations = relations(user, ({ many }) => ({
    messages: many(message),
    rooms:many(room)
}));

export const room=mysqlTable(
    'room',{
        id:bigint('id',{mode:'number'}).notNull().primaryKey().autoincrement(),
        name:varchar('name',{length:256}).notNull(),
        createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
        updatedAt:timestamp('updated_at').onUpdateNow(),
    }
)

export const roomRelations=relations(room,({many})=>({
    users:many(user)
}))



export const roomToUser = mysqlTable('room_to_user', {
        id: bigint('user_id', {mode: 'number'}).notNull().primaryKey().autoincrement(),
        ownerId:bigint('creatorId_id',{mode:'number'}).notNull(),
        userId: bigint('user_id', {mode: 'number'}).notNull(),
        roomId: bigint('room_id', {mode: 'number'}).notNull(),
        createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
        updatedAt: timestamp('updated_at').onUpdateNow(),
    }
);


export const roomToUserRelations=relations(roomToUser,({one})=>({
    userId:one(user,{
        fields:[roomToUser.userId],
        references:[user.id]
    }),
    roomId:one(room,{
        fields:[roomToUser.roomId],
        references:[room.id]
    }),
}))


export const message=mysqlTable('message',{
    id:bigint('id',{mode:'number'}).primaryKey().autoincrement(),
    text:varchar('text',{length:1000}),
    userId:bigint('user_id',{mode:'number'}).notNull(),
    roomId:bigint('room_id',{mode:'number'}).notNull(),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt:timestamp('updated_at').onUpdateNow(),
})

export const messageRelations=relations(message,({one})=>({
    user:one(user,{
        fields:[message.userId],
        references:[user.id]
    }),
    roomId:one(room,{
        fields:[message.roomId],
        references:[room.id]
    })
}))





export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);
