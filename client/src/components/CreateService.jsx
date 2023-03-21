import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavBar from './NavBar';
import {React, useState} from 'react';

const CreateService = () => {

    
    const [newService, setNewService] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        esquema: ""
      });

      const handleChangeDescription = e => {
        setNewService({
          ...newService,
          descripcion: e.target.value
        });
      };

      const handleChangeName = e => {
        setNewService({
          ...newService,
          nombre: e.target.value
        });
      };
      const handleChangePrice = e => {
        setNewService({
          ...newService,
          precio: e.target.value
        });
      };
    
      const handleChangePaymentPlan = e => {
        setNewService({
          ...newService,
          esquema: e.target.value
        });
      };

      const handleAddService = async () => {
        await fetch("https://binaryquotations.herokuapp.com/createService", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             nombre: newService.nombre,
             descripcion: newService.descripcion,
             precio: String(newService.precio),
             esquema: newService.esquema
             }),
         })
           .then((res) => res.json())
           .then((data) => {
             console.log(data);
           })
           .catch(err => console.log(err))
       };

      
  return (
     <div>
        <NavBar/>
        <h2 id="addService">Agregar nuevo servicio</h2>
          <div style={{ width:'100vw', display: 'flex', flexDirection:'column', justifyContent:'center', alignContent:'center' }}>
          <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="nombre"
            label="nombre"
            name='nombre'
            value={newService.nombre || ""}
            onChange={handleChangeName}
          />
          <TextField
            id="descripcion"
            label="descripcion"
            name='descripcion'
            value={newService.descripcion || ""}
            onChange={handleChangeDescription}
          />
          <TextField
            id="precio"
            label="precio"
            name='precio'
            value={newService.precio || ""}
            onChange={handleChangePrice}
          />
          <TextField
            id="esquema"
            label="esquema"
            name='esquema'
            value={newService.esquema || ""}
            onChange={handleChangePaymentPlan}
          />
        </Box>
        <Button variant="contained" id="addServiceButton" onClick={handleAddService}>Agregar servicio</Button>
        </div>
        </div>
  )
}

export default CreateService;