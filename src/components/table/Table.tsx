import React from 'react';
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import { MuiCss } from '../../style/MuiCss';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company: {
    name: string;
  };
  jobTitle: string;
  contactAccuracyScore: number;
}


interface TableProps {
  data: Lead[];
}

const Table: React.FC<TableProps> = ({ data}) => { 
  const cols: GridColDef[] = [
    {
      field: "company_name",
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "contact_jobTitle",
      headerName: "Job Title",
      flex: 1,
    },
    {
      field: "contact_firstName",
      headerName: "Contact Name",
      flex: 1,
      renderCell: (param) => {
        return (
          <Box>
            {param.row.contact_firstName}&nbsp;{param.row.contact_lastName}
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Buyer Intent",
      flex: 1,
    },
  
  ];

  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel | Lead[]>([]);
  console.log(selectedRows,'rowSelectionModel==>');
  

  return (
    <Box>
      {/* Display DataGrid */}
      <Box width={"65vw"}>
       <DataGrid
          getRowId={(row: any) => `${row.id_x}${Math.random()}`}
          rows={data.length > 50 ? data?.slice(0, 50) : []}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterSelectedRowCount
          sx={{
            ...MuiCss.datagridTable,
            fontSize:14
          }}
          rowHeight={35}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = data.filter((row) =>
              selectedIDs.has(row.id),
            );
  
            setSelectedRows(selectedRows);
          }}
        />
      </Box>
    </Box>
  );
};

export default Table;
