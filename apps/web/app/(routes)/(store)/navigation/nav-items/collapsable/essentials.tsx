import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { FileIcon } from "@phosphor-icons/react/File";
import NavTree from "./tree";

export default function Essentials() {
  const subordinateItems = [
    {
      icon: <FileIcon size={19} weight="duotone" />,
      name: "Brand Identity",
    },
    {
      icon: <FileIcon size={20} weight="duotone" />,
      name: "Docs",
    },
    {
      icon: <FileIcon size={20} weight="duotone" />,
      name: "Marketing",
    },
  ];

  return (
    <NavTree
      icon={<FolderSimpleIcon size={21} weight="duotone" />}
      name="Essentials"
      subordinate={subordinateItems}
    />
  );
}
