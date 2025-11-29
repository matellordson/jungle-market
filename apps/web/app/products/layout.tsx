export default function ProductLayout({
  children,
  detail,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{detail}</div>
    </>
  );
}
