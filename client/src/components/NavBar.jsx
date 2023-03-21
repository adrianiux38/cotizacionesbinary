import {Link} from 'react-router-dom';
import binaryLogo from '../components/binary.png';
import Button from '@mui/material/Button';


const NavBar = ({handleCreateQuotation}) => {
  return (
    <div style={{display:'flex', flexDirection:'row', backgroundColor:'black'}}>
      <div style={{display:'flex', flex:'0.4',  marginLeft:'2%', alignContent:'center'}}>
        <img
          className="w-6 h-6 object-contain cursor-pointer"
          src={binaryLogo}
          alt="Binary Politics Logo"
          style={{maxWidth:'20%'}}
        />
        <p style={{display:'flex', height:'100%', alignItems:'center', marginTop:0, fontFamily:'sans-serif', fontWeight:'bold', color:'white'}}>  Binary Politics</p>
      </div>
      <div style={{display:'flex', flex:'0.5', marginLeft:'2%', justifyContent:'space-around', alignItems:'center'}}>
        <Link style={{textDecoration:'none', color:'white'}} to="/">Crear Cotización</Link>
        <Link style={{textDecoration:'none', color:'white'}}  to="/crear-servicio">Crear servicio</Link>
        <Button variant="contained" onClick={handleCreateQuotation}>
            Generar Cotización
        </Button>
      </div>
      </div>
  )
}

export default NavBar;