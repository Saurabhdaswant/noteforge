import CreateNote from "@/components/create-note";
import { EmptyNotes } from "@/components/empty-notes";
import NotebookCard from "@/components/notebook-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";

export default async function Page() {
    const notebooks = await getNotebooks();

    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
            <CreateNote />


            {notebooks.success &&
                notebooks?.notebooks?.map((notebook) => (
                    <NotebookCard key={notebook.id} notebook={notebook} />
                ))}


        </PageWrapper>
    )
}
