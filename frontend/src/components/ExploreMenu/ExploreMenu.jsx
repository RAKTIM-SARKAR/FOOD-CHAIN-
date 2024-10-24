import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu & Get Your Favourite Meals Here</h1>
        <p className='explore-menu-text'>Hungry for something special? Browse, order, and enjoy meals crafted with premium ingredients by culinary experts. Easy, fast, and delicious. Your next meal is just a click away!.Dive into a world of culinary delights with our expertly curated menu.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='' />
                        <p>{item.menu_name}</p>
                        </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
