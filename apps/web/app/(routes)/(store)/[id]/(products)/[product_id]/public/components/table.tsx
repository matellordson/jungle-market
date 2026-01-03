import styled from "styled-components";
import { ReactTabulator } from "react-tabulator";
import Link from "next/link";
import { Button } from "../../../../../../../../components/button";

const Wrapper = styled.div`
  padding: 10px;
`;

const TableActions = styled.div``;

export default function PublicTable() {
  return (
    <Wrapper>
      <TableActions>
        <Button href="public/request">Public request</Button>
      </TableActions>
      {/* <ReactTabulator data={data} columns={columns} /> */}
    </Wrapper>
  );
}
