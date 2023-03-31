import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { DLT } from '../redux/actions/action';
import { useEffect } from 'react';

const Header = () => {

  const [price, setPrice] = useState(0);
  

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const dispatch = useDispatch();

  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };


  const dlt = (id
    ) => {
    dispatch(DLT(id))
  }

  const total = () =>{
    let price = 0;
    getdata.map((e, k) => {
      price = e.price * e.qnty + price
    });
    setPrice(price);
  };

  useEffect(()=>{
    total();
  },[total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>

          </Nav>

          <Badge badgeContent={getdata.length} color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <i className="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }} ></i>
          </Badge>
        </Container>


        <Menu
          id='basic-menu'
          anchorEl={anchorE1}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>

          {
            getdata.length ?
              <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                <Table>
                  <thead>
                    <tr>
                      <th>photo</th>
                      <th>Restaurant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getdata.map((e) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} />
                                </NavLink>
                               
                              </td>
                              <td>
                                <h6>{e.rname}</h6>
                                <h6>Price: ₹{e.price}</h6>
                                <h6>Quantity: {e.qnty}</h6>
                                <h6 style={{ color: "red", fontsize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)}>
                                  <i className='fas fa-trash smalltrash'></i>
                                </h6>
                              </td>
                              <td className='mt-5' style={{ color: "red", fontsize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)}>
                                <i className='fas fa-trash largetrash'></i>
                              </td>
                            </tr>
                          </>
                        )
                      })
                    }
                    <h6 className='text-center'>Total: ₹{price}</h6>
                  </tbody>
                </Table>
              </div> :
              <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "18rem", padding: 5, position: "relative" }}>
                <i className='fas fa-close smallclose'
                  onClick={handleClose}
                  style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                <p style={{ fontSize: 18 }}>Your cart is empty</p>
                <img src='./cart.gif' alt='' className='emptycart_img' style={{ width: "5rem", padding: 10 }}></img>
              </div>

          }


        </Menu>
      </Navbar>
    </>
  );
}

export default Header;