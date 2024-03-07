import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, Typography, Chip } from "@mui/material";
export interface IDataNode {
  Id: string;
  Name: string;
}

interface DetailedIndustrySearchProps {
  openDialog: boolean;
  handleDialogClose: () => void;
  naiceCodes: IDataNode[];
  setSelectedItemsInParent: (items: IDataNode[]) => void;
}

const DetailedIndustrySearch: React.FC<DetailedIndustrySearchProps> = ({ openDialog, handleDialogClose, naiceCodes, setSelectedItemsInParent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectItem = (id: string) => {
    const currentIndex = selectedItems.indexOf(id);
    const newChecked = [...selectedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedItems(newChecked);
  };

  const handleDialogCloseWithLogging = () => {
    const selectedItemsDetails = selectedItems.map(id => naiceCodes.find(item => item.Id === id));
    setSelectedItemsInParent(selectedItemsDetails);
    handleDialogClose();
  };

  const renderNaicsCodes = (data: IDataNode[]) => {
    return data.map((item) => {
      const paddingLeft = (item.Id.length - 2) * 20; // Adjust for desired indentation
      return (
        <div key={item.Id} style={{ display: 'flex', alignItems: 'center', paddingLeft: `${paddingLeft}px`, marginTop: '10px' }}>
          <Checkbox
            checked={selectedItems.indexOf(item.Id) !== -1}
            onChange={() => handleSelectItem(item.Id)}
          />
          <Typography variant='body1'>{item.Id} - {item.Name}</Typography>
        </div>
      );
    });
  };

  const filteredData = naiceCodes.filter((item) =>
    item.Id.includes(searchTerm) || item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={openDialog} onClose={handleDialogCloseWithLogging} maxWidth="md" fullWidth>
      <DialogTitle>Detailed Industry Search</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ flex: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              label="Search by ID or Name"
              type="search"
              variant="standard"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Display filtered NAICS Codes */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {renderNaicsCodes(filteredData)}
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '20px' ,width:40}}>
            <Typography variant="h6">Selected Items</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedItems.map((id) => {
                const selectedItem = naiceCodes.find(item => item.Id === id);
                return (
                  <Chip
                    key={id}
                    label={`${selectedItem?.Id} - ${selectedItem?.Name}`}
                    onDelete={() => handleSelectItem(id)}
                    style={{ marginRight: '8px', marginBottom: '8px'}}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogCloseWithLogging}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailedIndustrySearch;
