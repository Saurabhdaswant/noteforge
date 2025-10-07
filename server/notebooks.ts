"use server"

import { db } from "@/db/drizzle"
import { InsertNotebook, notebooks } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export const createNotebook = async (values: InsertNotebook) => {
    try {
        await db.insert(notebooks).values(values)
        return { success: true, message: "Notebook created successfully" }
    } catch {
        return { success: false, message: "Error creating notebook" }
    }
}

export const getNoteBooks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        const userId = session?.user?.id

        if (!userId) {
            return { success: false, message: "User not found" }
        }

        return await db.select().from(notebooks).where(eq(notebooks.userId, userId))
    } catch {
        return { success: false, message: "Error fetching notebooks" }
    }
}

export const getNoteBookById = async (id: string) => {
    try {
        const notebook = await db.select().from(notebooks).where(eq(notebooks.id, id)).limit(1)
        return { success: true, notebook: notebook[0] }
    } catch {
        return { success: false, message: "Error fetching notebook" }
    }
}

export const updateNotebook = async (id: string, name: string) => {
    try {
        await db.update(notebooks).set({ name }).where(eq(notebooks.id, id))
        return { success: true, message: "Notebook updated successfully" }
    } catch {
        return { success: false, message: "Error updating notebook" }
    }
}

export const deleteNotebook = async (id: string) => {
    try {
        await db.delete(notebooks).where(eq(notebooks.id, id))
        return { success: true, message: "Notebook deleted successfully" }
    } catch {
        return { success: false, message: "Error deleting notebook" }
    }
}
