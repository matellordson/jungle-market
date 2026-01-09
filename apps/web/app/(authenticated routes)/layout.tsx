export default function AuthenticatedRoutesLayout({
  client,
  store,
}: Readonly<{
  client: React.ReactNode;
  store: React.ReactNode;
}>) {
  const role = "buyer";
  return (
    <div>
      {role == "buyer" ? client : role == "store" ? store : ""}
      {/* TODO: create an anonymous route where you can showcase with authenication */}
    </div>
  );
}
