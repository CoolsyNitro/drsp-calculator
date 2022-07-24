import React from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ isOpen, handleClose, children, maxWidth }) {
    return (
        <Dialog
            fullScreen
            maxWidth={maxWidth}
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{
                style: {
                    backgroundColor: '#222222',
                    boxShadow: 'none',
                },
            }}
        >
            {children}
        </Dialog>
    );
}
