import styled from "styled-components";
import { url } from "../../../../../../../utils/url";

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 992px) {
    padding: 20px 40px;
  }
`;

const PluginList = styled.button`
  height: 200px;
  width: 100%;
  min-width: 300px;
  background-color: var(--foreground);
  cursor: pointer;
  border: var(--border);
  border-radius: 5px;
  font-family: inherit;
  color: inherit;
  display: inherit;

  @media only screen and (min-width: 992px) {
    width: 300px;
  }

  &:hover {
    background-color: var(--highlight);
  }

  &:focus {
    outline: none;
  }
`;

const plugins = [
  {
    name: "Public",
  },
  {
    name: "Docs",
  },
];

export function ProductPlugins({ productId }: { productId: string }) {
  const handlePublic = async () => {
    await fetch(`${url}/plugins/public/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDocs = async () => {
    await fetch(`${url}/plugins/docs/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Wrapper>
      {plugins.map((plugin) => (
        <form
          key={plugin.name}
          action=""
          style={{
            display: "inherit",
            gap: "inherit",
            width: "inherit",
          }}
        >
          {plugin.name == "Public" ? (
            <PluginList key={plugin.name} formAction={handlePublic}>
              <p>{plugin.name}</p>
            </PluginList>
          ) : plugin.name == "Docs" ? (
            <PluginList key={plugin.name} formAction={handleDocs}>
              <p>{plugin.name}</p>
            </PluginList>
          ) : (
            ""
          )}
        </form>
      ))}
    </Wrapper>
  );
}
