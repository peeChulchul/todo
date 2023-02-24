import React from "react"
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { Button, InputBase, Paper, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
type TodosProps ={
    todo:string,
    id:string,
    finish:boolean,
    onDeleteTodo:(id:string)=>void,
    onUpdateTodo:(id:string,newTodo:string,finish:boolean)=>void
}


const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,

    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : 'orange',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
  }));
  
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'orange',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor:'orange',
    },
  });
  
  // Inspired by blueprintjs
  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          '&:hover': { bgcolor: 'transparent' },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        {...props}
      />
    );
  }

const Todos =({todo,id,finish,onDeleteTodo,onUpdateTodo}:TodosProps)=>{
    const [editing,setEditing] = React.useState(false)
    const [newTodo,setNewTodo] = React.useState(todo)

 const onEditing =()=>{
    setEditing(true)
 }
 
 const onSubmit =(e:React.SyntheticEvent)=>{
    e.preventDefault()
    onUpdateTodo(id,newTodo,finish)
    setEditing(false)
 }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateTodo(id,todo,event.target.checked)

    };

    return(
        <Box sx={{display:'flex',alignItems:"center",padding:"5px",color:"white"}}>
     <BpCheckbox
      disableRipple
      checked={finish}
      onChange={handleChange}
      sx={{fill:'white'}}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    {!editing ? <Typography sx={{flex:'1'}}>
        {todo}
    </Typography> :  <Paper
                onSubmit={onSubmit}
                component="form"
                sx={{ p: '2px 4px',display:'flex',flex:"1"}}>
                  <InputBase
                  sx={{ ml: 1, flex: 1,padding:"0px" }}
                  placeholder="Typing Todos"
                  inputProps={{ 'aria-label': 'Search Todos' }}
                  value={newTodo}
                  onChange={(e)=>setNewTodo(e.target.value)}
              />
              <Button type="submit" sx={{borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px"}} variant="contained">Add</Button>
            </Paper>}
    
    <Box sx={{"& button":{marginX:'5px'}}}>
    <IconButton onClick={onEditing} aria-label="delete" sx={{padding:'0px' ,backgroundColor:"gray","& svg":{fill:"white"}}} disableFocusRipple disableRipple size="small" >
        <EditIcon  />
      </IconButton>
    <IconButton onClick={()=>onDeleteTodo(id)} aria-label="delete" sx={{padding:'0px' ,backgroundColor:"gray","& svg":{fill:"white"}}} disableFocusRipple disableRipple size="small" >
        <DeleteIcon />
      </IconButton>
      </Box>
    </Box>)
}

export default Todos