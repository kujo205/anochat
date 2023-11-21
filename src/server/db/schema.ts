// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
    bigint,
    index,
    int,
    mysqlTableCreator,
    timestamp,
    varchar, mysqlEnum, boolean,
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
    description:varchar('description',{length:500}).default('No description'),
    avatar:varchar('avatar',{length:256}),
    accessKey:varchar('access_key',{length:256}),
    isInQueue:boolean('is_in_queue').default(false),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt:timestamp('updated_at').onUpdateNow(),
})


export const userRelations = relations(user, ({ many }) => ({
    messages: many(message),
    rooms:many(room)
}));

export const room=mysqlTable(
    'room',{
        creatorId:bigint('creator_id',{mode:'number'}).notNull(),
        id:bigint('id',{mode:'number'}).notNull().primaryKey().autoincrement(),
        name:varchar('name',{length:256}).notNull(),
        type:mysqlEnum('group_type', ['PERSONAL', 'DUAL', 'MULTIPLE']),
        createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
        updatedAt:timestamp('updated_at').onUpdateNow(),
        maxUsers:int('max_users')
    }
)

export const roomRelations=relations(room,({many})=>({
    users:many(user)
}))

export const role=mysqlTable('role',{
    id:bigint('id',{mode:'number'}).notNull().primaryKey().autoincrement(),
    name:varchar('role', {length:150}).notNull(),
})

export const roomToUser = mysqlTable('room_to_user', {
        id: bigint('user_id', {mode: 'number'}).notNull().primaryKey().autoincrement(),
        roleId:bigint('role_id', {mode: 'number'}).notNull(),
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
    roleId:one(role,{
        fields:[roomToUser.roleId],
        references:[role.id]
    })
}))


export const message=mysqlTable('message',{
    id:bigint('id',{mode:'number'}).primaryKey().autoincrement(),
    text:varchar('text',{length:1000}),
    userId:bigint('user_id',{mode:'number'}).notNull(),
    roomId:bigint('room_id',{mode:'number'}).notNull(),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt:timestamp('updated_at').onUpdateNow(),
    type:mysqlEnum('message_type', ['TEXT', 'IMAGE']),
    url:varchar('url',{length:256}),
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

