import { StoreLayoutComp } from "../../../components/store-layout";
import { StoreOnboarding } from "./components/store-onboarding";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreLayoutComp>
      {/* {children}  */}
      <StoreOnboarding />
    </StoreLayoutComp>
  );
}
