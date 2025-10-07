import { EmptyNotes } from "@/components/empty-notes";
import { PageWrapper } from "@/components/page-wrapper";
import { getNoteBooks } from "@/server/notebooks";

export default async function Page() {
    const notebooks: any = await getNoteBooks();

    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
            <div className="h-full">
                {
                    notebooks && notebooks?.length === 0 && (
                        <EmptyNotes />
                    )
                }
            </div>
        </PageWrapper>
    )
}
