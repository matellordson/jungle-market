import { StoreLayoutComp } from "../../../components/store-layout";
import NoStore from "./components/no-store";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreLayoutComp>
      {/* {children}  */}
      <NoStore />
    </StoreLayoutComp>
  );
}
