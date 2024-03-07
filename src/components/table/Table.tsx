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
      field: "contactAccuracyScore",
      headerName: "Lead Score",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Company Name",
      flex: 1,
      renderCell: (param) => {
        return (
          <Box>
            {param.row.company.name}
          </Box>
        );
      },
    },
    {
      field: "firstName",
      headerName: "Contact Name",
      flex: 1,
      renderCell: (param) => {
        return (
          <Box>
            {param.row.firstName}&nbsp;{param.row.lastName}
          </Box>
        );
      },
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
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
          getRowId={(row: any) => row.id + Math.random()}
          rows={data ? data : []}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterSelectedRowCount
          sx={{
            ...MuiCss.datagridTable,
          }}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            console.log(ids,'ids');
            
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
