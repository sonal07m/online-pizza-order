import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const PriceDialog = (props) => {
  const [lastOpenedStatus, setLastOpenedStatus] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  // Only when this dialog is opened, copy the prices to local state.

  useEffect(() => {
    setMax(props.max);
    setMin(props.min);
    setLastOpenedStatus(props.open);
  }, [props.open === true && lastOpenedStatus === false]);
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DialogTitle>Enter price range</DialogTitle>

          <div style={{ display: 'flex', padding: 20 }}>
            <TextField
              value={min}
              type="number"
              style={{ width: 70 }}
              placeholder="Min"
              label="Min"
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (Number.isNaN(val) || val < 0 || val > 100000) {
                  return;
                }
                setMin(val);
              }}
            />
            <TextField
              value={max}
              type="number"
              style={{ width: 70, marginLeft: 20 }}
              placeholder="Max"
              label="Max"
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);

                if (Number.isNaN(val) || val < 0 || val > 100000) {
                  return;
                }
                setMax(val);
              }}
            />
          </div>
          <div style={{ display: 'flex', padding: 20 }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: 50 }}
              onClick={() => {
                props.onSave(min, max);
              }}
            >
              OK
            </Button>
            <Button
              color="primary"
              variant="outlined"
              style={{ width: 50, marginLeft: 5 }}
              onClick={() => {
                props.onClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default PriceDialog;
