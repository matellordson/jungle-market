import OwnerCheck from "./owner-check";

export default async function StoreLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  return (
    <div>
      <OwnerCheck id={id}>
        <>
          {children} {id}
        </>
      </OwnerCheck>
    </div>
  );
}
