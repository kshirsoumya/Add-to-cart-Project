import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import Cardsdata from './CardsData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { DLT, REMOVE } from '../redux/actions/action';
import { ADD } from '../redux/actions/action';

function CardsDetails() {

  const [data, setData] = useState([]);
  // console.log(data);

  const { id } = useParams();
  // console.log(id);

  const history = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
    // console.log(comparedata);
  }

  //add data
  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  }


  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  }

  //remove one

  const remove = (item) => {
    dispatch(REMOVE(item));
  }


  useEffect(() => {
    compare();
  }, [id])

  return (
    <>
      <div className='container mt-2'>
        <h2 className='text-center'>Items Details Page</h2>

        <section className='container mt-3'>
          <div className='itemsdetails'>
            {
              data.map((element) => {
                return (
                  <>
                    <div className="items_img">
                      <img src={element.imgdata} alt='' />
                    </div>

                    <div className="details">
                      <Table>
                        <tr>
                          <td>
                            <p><strong>Restaurant</strong> :{element.rname}</p>
                            <p><strong>Price</strong> : ₹{element.price}</p>
                            <p><strong>Dishes</strong> : {element.address}</p>
                            <p><strong>Total</strong> : ₹{element.price * element.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                              <span style={{ fontSize: 24 }} onClick={element.qnty <= 1 ? () => dlt(element.id) : () => remove(element)}>-</span>
                              <span style={{ fontSize: 22 }}>{element.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(element)}>+</span>
                            </div>
                          </td>

                          <td>
                            <p><strong>Rating :</strong> <span style={{ background: "green", color: "white", padding: "2px 5px", borderRadius: "5px" }}>{element.rating} ★</span></p>
                            <p><strong>Order Review :</strong><span>{element.somedata}</span></p>
                            <p><strong>Remove :</strong><span><i className='fas fa-trash' onClick={() => dlt(element.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                )
              })
            }

          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails
