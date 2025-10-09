import React from 'react'
import { EmptyNotes } from './empty-notes'

export default function NotebookCard({ notebook }: any) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{notebook.name}</h2>
        </div>
    )
}
