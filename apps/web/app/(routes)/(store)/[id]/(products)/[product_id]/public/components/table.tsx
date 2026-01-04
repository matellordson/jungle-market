import styled from "styled-components";
import RequestModal from "./request-modal";

const Wrapper = styled.div`
  padding: 10px;
`;

const TableActions = styled.div``;

export default function PublicTable() {
  return (
    <Wrapper>
      <TableActions>
        <RequestModal />
      </TableActions>
      {/* <ReactTabulator data={data} columns={columns} /> */}
    </Wrapper>
  );
}
