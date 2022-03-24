import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
    columns: Array<any>
    rows: Array<any>
    heightTable?: string
    pageSize?: number
    getRowId: any
    checkboxSelection: boolean
    onSelectionModelChange?: any
}
const TableBase = ({columns, rows, heightTable, pageSize, getRowId, checkboxSelection, onSelectionModelChange}: Props) => {
  return (
    <div style={{ height: heightTable, width: '100%', margin: '40px 0', }}>
      <DataGrid
        // FIXME add to props?
        initialState={{
          sorting: {
            sortModel: [{ field: 'timestamp', sort: 'desc' }],
          },
        }}
        rows={rows}
        autoHeight={true}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[100]}
        checkboxSelection={checkboxSelection}
        getRowId={getRowId}
        onSelectionModelChange={onSelectionModelChange}
        disableSelectionOnClick
      />
    </div>
  );
}

export default TableBase;
