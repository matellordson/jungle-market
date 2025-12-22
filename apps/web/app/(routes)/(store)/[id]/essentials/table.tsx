"use client";

import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import type { ColumnDefinition } from "react-tabulator";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { url } from "../../../../../utils/url";
import { TextAaIcon } from "@phosphor-icons/react/TextAa";
import { ListPlusIcon } from "@phosphor-icons/react/ListPlus";
import { UserListIcon } from "@phosphor-icons/react/UserList";
import { CaretCircleDownIcon } from "@phosphor-icons/react/CaretCircleDown";
import { TextAlignLeftIcon } from "@phosphor-icons/react/TextAlignLeft";
import { ListBulletsIcon } from "@phosphor-icons/react/ListBullets";
import { HashIcon } from "@phosphor-icons/react/Hash";
import { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank";
import { renderToStaticMarkup } from "react-dom/server";
import { DateTime } from "luxon";
import { Button } from "@repo/ui/button";

(window as any).luxon = { DateTime };

const Wrapper = styled.div`
  border-radius: 10px;
  max-width: 992px;
  margin: auto;
  margin-top: 100px;
`;

const TableActions = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export function EssentialTable({ storeId }: { storeId: string }) {
  type EssentialRow = {
    name: string;
    priority: "High" | "Medium" | "Low" | null;
    summary: string | null;
    owner: string | null;
    version: string | null;
    tags: string | null;
    created_at: string;
  };

  type tagData = {
    tags: string[];
  };

  const [essentialData, setEssentialData] = useState<EssentialRow[]>([]);
  const [tagProperties, setTagProperties] = useState<tagData>({
    tags: [],
  });

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

  useEffect(() => {
    const getTagProperties = async () => {
      const tagApi = await fetch(`${url}/table-properties/tags/${storeId}`);
      const tagData = await tagApi.json();
      console.log(tagData);
      setTagProperties(tagData);
    };

    getTagProperties();
  });

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
      title: "Priority",
      field: "priority",
      sorter: "string",
      width: 150,
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
            color:${color};
            background:${bg};
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
      width: 300,
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
    ${renderToStaticMarkup(<UserListIcon size={18} weight="bold" />)}
    <span>Owner</span>
  `;

        return el;
      },
    },
    {
      title: "Version",
      field: "version",
      sorter: "string",
      width: 150,
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
      headerSort: false,
      editor: "list" as ColumnDefinition["editor"],

      formatter: (cell: any) => {
        const values = cell.getValue();

        if (!values) return "";
        const tagArray = Array.isArray(values) ? values : values.split(",");

        const tagsHtml = tagArray
          .map(
            (tag: any) => `
      <span style="
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 6px;
        font-weight: 500;
        background-color: var(--foreground);
        color: var(--text-light);
        white-space: nowrap;
        flex-shrink: 0; 
      ">
        ${tag.trim()}
      </span>
    `
          )
          .join("");

        // The container now handles the horizontal scroll
        return `
      <div class="tag-scroll-container" style="
        display: flex; 
        align-items:center;
        flex-wrap: nowrap; 
        overflow-x: auto; 
        gap: 6px; 
        padding: 4px 0;
        width: 100%;
        height: 100%;
        scrollbar-width: none; 
      ">
        <style>
          .tag-scroll-container::-webkit-scrollbar { display: none; } 
        </style>
        ${tagsHtml}
      </div>
    `;
      },

      titleFormatter: () => {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "8px";

        el.innerHTML = `
      ${renderToStaticMarkup(<ListBulletsIcon size={18} weight="bold" />)}
      <span style="font-weight: 600;">Tags</span>
    `;

        return el;
      },

      editorParams: {
        values: tagProperties?.tags || [],
        multiselect: true,
        sort: "asc",
        itemFormatter: (value: string, title: string) => {
          return `
        <div style="padding: 4px; font-size: 13px; display: flex; align-items: center;">
          ${title}
        </div>
      `;
        },
      },
    },
    {
      title: "Created At",
      field: "created_at",
      sorter: "date",
      width: 150,
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
      <TableActions>
        {/* <Button accent={true}>
          <ListPlusIcon size={20} weight="duotone" />
          New
        </Button> */}
      </TableActions>
      <ReactTabulator
        columns={tableColumns}
        data={essentialData}
        layout={"fitDataStretch"}
      />
    </Wrapper>
  );
}
