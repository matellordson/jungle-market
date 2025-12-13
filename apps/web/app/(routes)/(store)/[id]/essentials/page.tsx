import { EssentialTable } from "./table";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <EssentialTable storeId={id} />
    </div>
  );
}
