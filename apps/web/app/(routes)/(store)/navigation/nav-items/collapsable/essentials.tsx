"use client";

import { FolderSimpleIcon } from "@phosphor-icons/react/FolderSimple";
import { ListIcon } from "@phosphor-icons/react/List";
import { FileIcon } from "@phosphor-icons/react/File";
import NavTree from "./tree";
import { useEffect, useState } from "react";
import { url } from "../../../../../../utils/url";

interface SubordinateType {
  id: string;
  name: string;
}

export default function Essentials({
  active,
  href,
  storeId,
}: {
  active: boolean;
  href: string;
  storeId: string;
}) {
  const [subordinateData, setSubordinateData] = useState<SubordinateType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubordinate = async () => {
      const api = await fetch(`${url}/essentials/${storeId}`);

      const apiData = await api.json();
      setSubordinateData(apiData);
    };

    getSubordinate();
  }, [storeId]);

  const subordinateItems = [
    {
      icon: <ListIcon size={19} weight="duotone" />,
      name: "List",
      href: `/${storeId}/essentials`,
    },
    ...subordinateData.map((item) => ({
      icon: <FileIcon size={19} weight="duotone" />,
      name: item.name,
      href: `/${storeId}/essentials/${item.name}`,
    })),
  ];

  return (
    <NavTree
      active={active}
      icon={<FolderSimpleIcon size={21} weight="duotone" />}
      name="Essentials"
      subordinate={subordinateItems}
      href={href}
    />
  );
}
