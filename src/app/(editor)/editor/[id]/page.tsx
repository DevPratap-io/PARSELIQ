import { notFound } from "next/navigation";
import { EditorView } from "@/components/app/editor-view";
import { documents, getDoc } from "@/lib/mock-data";

export function generateStaticParams() {
  return documents.map((d) => ({ id: d.id }));
}

export default async function EditorPage(props: PageProps<"/editor/[id]">) {
  const { id } = await props.params;
  const doc = getDoc(id);
  if (!doc) notFound();
  return <EditorView doc={doc} />;
}
