import React ,{useState} from 'react';
import TextField  from '@material-ui/core/TextField';

function Textfild({state}) {
  const [_name, setName] = useState("");
  

  function handleChange(e){
      setName(e.target.value);
      state.name=e.target.value;
  }
     
    return (
        <div>
                                            <TextField 
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    size='small'
                                    value={_name}
                                    name='name'
                                    label='Name'
                                   
                                    id='name'
                                 
                                    autoComplete='name'
                                    onChange={handleChange}
                                />
        </div>
    )
}

export default Textfild
