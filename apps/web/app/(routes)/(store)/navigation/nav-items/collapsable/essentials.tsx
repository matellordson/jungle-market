"use client";

import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { FileIcon } from "@phosphor-icons/react/File";
import NavTree from "./tree";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Essentials({
  active,
  href,
}: {
  active: boolean;
  href: string;
}) {
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
    <Link href={href}>
      <NavTree
        active={active}
        icon={<FolderSimpleIcon size={21} weight="duotone" />}
        name="Essentials"
        subordinate={subordinateItems}
      />
    </Link>
  );
}
