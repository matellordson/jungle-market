"use client";

import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import type { ColumnDefinition } from "react-tabulator";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { url } from "../../../../../utils/url";
import { TextAaIcon } from "@phosphor-icons/react/TextAa";
import { CirclesThreeIcon } from "@phosphor-icons/react/CirclesThree";
import { CaretCircleDownIcon } from "@phosphor-icons/react/CaretCircleDown";
import { TextAlignLeftIcon } from "@phosphor-icons/react/TextAlignLeft";
import { ListBulletsIcon } from "@phosphor-icons/react/ListBullets";
import { HashIcon } from "@phosphor-icons/react/Hash";
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
      cssClass: "row-name",
      headerHozAlign: "left",
      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
    ${renderToStaticMarkup(<TextAaIcon size={18} weight="bold" />)}
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
    ${renderToStaticMarkup(<ListBulletsIcon size={18} weight="bold" />)}
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
      editor: "list" as ColumnDefinition["editor"],

      formatter: (cell: any) => {
        const value = cell.getValue();

        let color = "";
        let bg = "";

        if (value === "High") {
          color = "var(--badge-red-text)";
          bg = "var(--badge-red-bg)";
        }

        if (value === "Medium") {
          color = "var(--badge-yellow-text)";
          bg = "var(--badge-yellow-bg)";
        }

        if (value === "Low") {
          color = "var(--badge-green-text)";
          bg = "var(--badge-green-bg)";
        }

        if (!value) return "";

        return `
      <div
        style="
          display:inline-flex;
          align-items:center;
          padding:3px 10px;
          border-radius:6px;
          color:${color};
          background:${bg};
          font-weight:500;
          width:fit-content;
          font-size: 13px;
        "
      >
        ${value}
      </div>
    `;
      },

      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "6px";

        el.innerHTML = `
      ${renderToStaticMarkup(<CaretCircleDownIcon size={18} weight="bold" />)}
      <span>Priority</span>
    `;

        return el;
      },

      editorParams: {
        values: ["High", "Medium", "Low"],

        itemFormatter: (value: string, title: string) => {
          let color = "";
          let bg = "";

          if (value === "High") {
            color = "var(--badge-red-text)";
            bg = "var(--badge-red-bg)";
          }

          if (value === "Medium") {
            color = "var(--badge-yellow-text)";
            bg = "var(--badge-yellow-bg)";
          }

          if (value === "Low") {
            color = "var(--badge-green-text)";
            bg = "var(--badge-green-bg)";
          }

          return `
        <div
          style="
            display:flex;
            align-items:center;
            padding:6px 10px;
            border-radius:6px;
            color:${color};
            background:${bg};
            font-weight:500;
            font-size: 13px;
          "
        >
          ${title}
        </div>
      `;
        },
      },
    } as any,
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
    ${renderToStaticMarkup(<TextAlignLeftIcon size={18} weight="bold" />)}
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
    ${renderToStaticMarkup(<ListBulletsIcon size={18} weight="bold" />)}
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
    ${renderToStaticMarkup(<HashIcon size={18} weight="bold" />)}
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
    ${renderToStaticMarkup(<ListBulletsIcon size={18} weight="bold" />)}
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
    ${renderToStaticMarkup(<CalendarBlankIcon size={18} weight="bold" />)}
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
        // layout={"fitDataStretch"}
      />
    </Wrapper>
  );
}
