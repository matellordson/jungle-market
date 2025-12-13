"use client";

import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import type { ColumnDefinition } from "tabulator-tables";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { url } from "../../../../../utils/url";

const Wrapper = styled.div`
  border-radius: 10px;
  max-width: 992px;
  margin: auto;
`;

export function EssentialTable({ storeId }: { storeId: string }) {
  type EssentialRow = {
    name: string;
    category: string | null;
    priority: "High" | "Medium" | "Low" | null;
    summary: string | null;
    owner: string | null;
    version: string | null;
    tags: string | null;
    created_at: string;
  };

  const [essentialData, setEssentialData] = useState<EssentialRow[]>([]);

  useEffect(() => {
    if (storeId) {
      const getStoreEssentials = async () => {
        const essentialsApi = await fetch(`${url}/essentials/${storeId}`);
        const essentialsData = await essentialsApi.json();
        setEssentialData(essentialsData);
      };
      getStoreEssentials();
    }
  }, []);

  const tableColumns: ColumnDefinition[] = [
    {
      title: "Name",
      field: "name",
      sorter: "string",
      width: 300,
      editor: true,
      headerSort: false,
    },
    {
      title: "Category",
      field: "category",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
    },
    {
      title: "Priority",
      field: "priority",
      sorter: "string",
      width: 200,
      headerSort: false,
      editor: "list",
      editorParams: {
        values: ["High", "Medium", "Low"],
      },
    },
    {
      title: "Summary",
      field: "summary",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
    },
    {
      title: "Owner",
      field: "owner",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
    },
    {
      title: "Version",
      field: "version",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
    },
    {
      title: "Tags",
      field: "tags",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
    },
    {
      title: "Created At",
      field: "created_at",
      sorter: "date",
      width: 200,
      editor: "date",
      headerSort: false,
    },
  ];

  return (
    <Wrapper>
      <ReactTabulator
        columns={tableColumns}
        data={essentialData}
        layout={"fitColumns"}
      />
    </Wrapper>
  );
}
