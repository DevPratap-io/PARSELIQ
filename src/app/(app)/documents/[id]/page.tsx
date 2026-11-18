import { notFound } from "next/navigation";
import { PreviewView } from "@/components/app/preview-view";
import { documents, getDoc } from "@/lib/mock-data";

export function generateStaticParams() {
  return documents.map((d) => ({ id: d.id }));
}

export default async function DocumentPage(props: PageProps<"/documents/[id]">) {
  const { id } = await props.params;
  const doc = getDoc(id);
  if (!doc) notFound();
  return <PreviewView doc={doc} />;
}
