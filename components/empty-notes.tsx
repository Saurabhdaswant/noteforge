import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export function EmptyNotes() {
    return (
        <Empty className=" h-full  border">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>No Notes Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any notes yet. Get started by creating
                    your first note.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button>Create Note</Button>
            </EmptyContent>

        </Empty>
    )
}
