"use client";

import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import type { ColumnDefinition } from "react-tabulator";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { url } from "../../../../../utils/url";
import { TextAaIcon } from "@phosphor-icons/react/TextAa";
import { CirclesThreeIcon } from "@phosphor-icons/react/CirclesThree";
import { ChartPieIcon } from "@phosphor-icons/react/ChartPie";
import { TextAlignLeftIcon } from "@phosphor-icons/react/TextAlignLeft";
import { UserIcon } from "@phosphor-icons/react/User";
import { GitDiffIcon } from "@phosphor-icons/react/GitDiff";
import { TagIcon } from "@phosphor-icons/react/Tag";
import { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank";
import { renderToStaticMarkup } from "react-dom/server";
import { DateTime } from "luxon";

(window as any).luxon = { DateTime };

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
      headerHozAlign: "left",
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<TextAaIcon size={18} weight="duotone" />)}
    <span>Name</span>
  `;

        return el;
      },
    },
    {
      title: "Category",
      field: "category",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<CirclesThreeIcon size={18} weight="duotone" />)}
    <span>Category</span>
  `;

        return el;
      },
    },
    {
      title: "Priority",
      field: "priority",
      sorter: "string",
      width: 200,
      headerSort: false,
      editor: "list" as unknown as ColumnDefinition["editor"],
      editorParams: {
        values: ["High", "Medium", "Low"],
      },
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<ChartPieIcon size={18} weight="duotone" />)}
    <span>Priority</span>
  `;

        return el;
      },
    },
    {
      title: "Summary",
      field: "summary",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<TextAlignLeftIcon size={18} weight="duotone" />)}
    <span>Summary</span>
  `;

        return el;
      },
    },
    {
      title: "Owner",
      field: "owner",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<UserIcon size={18} weight="duotone" />)}
    <span>Owner</span>
  `;

        return el;
      },
    },
    {
      title: "Version",
      field: "version",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<GitDiffIcon size={18} weight="duotone" />)}
    <span>Version</span>
  `;

        return el;
      },
    },
    {
      title: "Tags",
      field: "tags",
      sorter: "string",
      width: 200,
      editor: true,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<TagIcon size={18} weight="duotone" />)}
    <span>Tags</span>
  `;

        return el;
      },
    },
    {
      title: "Created At",
      field: "created_at",
      sorter: "date",
      width: 200,
      formatter: "datetime",
      formatterParams: {
        inputFormat: "iso",
        outputFormat: "yyyy-MM-dd",
      },
      editor: "date" as unknown as ColumnDefinition["editor"],
      editorParams: { format: "yyyy-MM-dd" } as any,
      headerSort: false,
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<CalendarBlankIcon size={18} weight="duotone" />)}
    <span>Created</span>
  `;

        return el;
      },
    },
  ];

  return (
    <Wrapper>
      <ReactTabulator
        columns={tableColumns}
        data={essentialData}
        layout={"fitDataStretch"}
        autoResize={false}
      />
    </Wrapper>
  );
}
