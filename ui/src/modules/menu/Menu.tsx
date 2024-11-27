import './Menu.css';
import ModuleCard from './components/ModuleCard';
import { modules } from '../modules/modules';

function Menu() {
	return <>
		<div className="menu-container">
			{modules.map((module, index) => (
				<ModuleCard
					key={index}
					name={module.name}
					link={module.link}
				/>
			))}
		</div>
	</>;
}

export default Menu;