import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import NoteForm from "./note-form"

export default function CreateNote() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Note</Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogDescription>
                        Add a new note to organize your thoughts and ideas.
                    </DialogDescription>
                    <NoteForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
