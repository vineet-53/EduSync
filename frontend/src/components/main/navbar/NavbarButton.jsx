import {Link} from "react-router-dom"

const NavbarButton = ({linkto ,children}) => { 
	return <> 
		<Link to ={linkto}> 
			<button className="px-2 py-2 text-white bg-custom-tertiary rounded-md cursor-pointer ">
					{children}
			</button>
		</Link>
	</>

}

export default NavbarButton;